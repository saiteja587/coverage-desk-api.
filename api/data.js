// api/data.js
// One serverless function, routed by ?resource=calls|roster|notes|dates|users|whoami
// Deployed on Vercel. Reads DB credentials from environment variables —
// never hard-code them here.
//
// Env vars needed (set in Vercel dashboard -> Project -> Settings -> Environment Variables):
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_CA_CERT (optional, see below)
//   ADMIN_PASSWORD (optional) — master password, always logs in as admin, and is
//   the credential used to create the first per-user accounts via the Manage
//   Users panel in the app.

const mysql = require('mysql2/promise');
// Ask Desk chat is optional: if its file is missing or broken, ONLY the chat is unavailable — calls, roster, closures etc. must keep working.
let handleChat = null;
try { ({ handleChat } = require('./_ask-desk-chat')); } catch (e) { console.error('Ask Desk chat module not loaded:', e && e.message); }
const crypto = require('crypto');

// Passwords used to be hashed with plain unsalted SHA-256 — fast by
// design, which is exactly the wrong property for a password hash: if the
// database ever leaked, every password would be crackable via rainbow
// tables in practice. scrypt is deliberately slow and memory-hard, with a
// random salt per password so two identical passwords never produce the
// same stored hash. Stored as "scrypt:<salt-hex>:<hash-hex>" so it's
// self-describing — verifyPassword below can tell a new-format hash from
// a legacy one just by looking at it, which is what makes migrating
// existing accounts without forcing a mass password reset possible.
function hashPwStrong(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(pw), salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}
function hashPwLegacySha256(pw) {
  return crypto.createHash('sha256').update(String(pw)).digest('hex');
}
// Verifies a password against whichever format the stored hash happens to
// be. needsUpgrade is true for a legacy hash that just verified correctly
// — the caller (authenticate() below) uses that signal to transparently
// re-hash and save the strong version, so an account upgrades itself the
// next time its real owner logs in with the correct password, with no
// explicit migration step and no forced password reset for anyone.
function verifyPassword(pw, storedHash) {
  if (!storedHash) return { valid: false, needsUpgrade: false };
  if (storedHash.startsWith('scrypt:')) {
    const [, salt, hashHex] = storedHash.split(':');
    const candidate = crypto.scryptSync(String(pw), salt, 64);
    const stored = Buffer.from(hashHex, 'hex');
    const valid = candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored);
    return { valid, needsUpgrade: false };
  }
  // Legacy plain-SHA256 hash — compared with a timing-safe check even
  // though SHA-256 itself offers no real protection here, since there's
  // no reason to skip that hygiene while it's still in play.
  const legacy = hashPwLegacySha256(pw);
  const a = Buffer.from(legacy, 'utf8'), b = Buffer.from(String(storedHash), 'utf8');
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b);
  return { valid, needsUpgrade: valid };
}
function newId() {
  return crypto.randomBytes(6).toString('hex');
}

function getConnection() {
  // Deliberately a single fresh connection per request, explicitly closed
  // when the request finishes — NOT a persistent pool. Pools are meant for
  // long-lived processes that reuse the same connections across many
  // requests; a serverless function is short-lived and can have many
  // separate instances running at once, each of which would otherwise
  // create its OWN pool that never gets properly cleaned up. That's exactly
  // what was causing "Too many connections" errors on Aiven's free tier —
  // stale pooled connections accumulating across instances until the limit
  // was hit. A single, explicitly-closed connection per request avoids
  // that entirely.
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_CA_CERT
      ? { ca: process.env.DB_CA_CERT.replace(/\\n/g, '\n') }
      : { rejectUnauthorized: false }, // Aiven requires TLS
  });
}

function setCors(req, res) {
  // Previously '*' — any website on the internet could call this API from
  // a visitor's browser. Scoped to a specific allowed origin instead, set
  // via the ALLOWED_ORIGIN env var (your actual frontend's URL, e.g.
  // https://coverage-desk-api.vercel.app or a custom domain). If it isn't
  // set yet, falls back to reflecting the request's own origin — safer
  // than '*' (a browser still enforces credentials/cookie rules per-origin
  // even then) but genuinely locking this down means setting ALLOWED_ORIGIN.
  const allowedOrigin = process.env.ALLOWED_ORIGIN || req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, x-username, x-password');
  // Explicitly tells Vercel's CDN/edge network (and any proxy in between)
  // never to cache these responses. Without this, a genuinely fresh save
  // could still be followed by a read that gets served a cached response
  // from Vercel's edge layer rather than the actual current database state
  // — invisible to the browser's own cache settings entirely, since it
  // happens server-side before the response even reaches the client.
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
}

// Auth: an ADMIN_PASSWORD env var grants full access via the
// 'x-admin-password' header (shared master password, used for older
// accounts). Beyond that, individual accounts in the `users` table log in
// with their own username/password and carry their own role ('admin' or
// 'user'). ADMIN_PASSWORD must be set for auth to work at all — previously,
// leaving it unset made the app fall back to granting full admin access to
// EVERY request with no password required at all, which is the wrong
// direction to fail in for an app holding real candidate data. Now a
// missing ADMIN_PASSWORD fails CLOSED (denies everything) instead, and
// logs a clear one-line signal server-side so a misconfigured deployment
// is loud instead of silently wide open.
// Rate limiting for both login paths (the shared admin password AND
// per-user accounts). A serverless function has no memory that persists
// between invocations — each request can land on a totally different
// underlying instance — so an in-memory attempt counter wouldn't work;
// this has to be tracked in the database instead. Deliberately simple:
// count recent failures for this identifier, block if there are too many.
// Fails OPEN on a database error here specifically (not the same
// direction as the ADMIN_PASSWORD check above) — a rate-limit check that
// can't run shouldn't be the reason a legitimate login gets rejected;
// the password check itself is still the real gate.
const RATE_LIMIT_WINDOW_MINUTES = 15;
const RATE_LIMIT_MAX_ATTEMPTS = 10;
async function isRateLimited(db, identifier) {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS cnt FROM login_attempts WHERE identifier = ? AND attempted_at > (NOW() - INTERVAL ? MINUTE)`,
      [identifier, RATE_LIMIT_WINDOW_MINUTES]
    );
    return rows[0].cnt >= RATE_LIMIT_MAX_ATTEMPTS;
  } catch (e) {
    return false; // table missing or a transient DB error — don't block real logins over it
  }
}
async function recordFailedAttempt(db, identifier) {
  try { await db.query('INSERT INTO login_attempts (identifier) VALUES (?)', [identifier]); }
  catch (e) { /* best-effort — a logging failure should never break the response */ }
  // FIX: this table previously had nothing pruning it, so it grew forever —
  // every failed login attempt, kept indefinitely. Only rows older than the
  // rate-limit window itself are ever actually looked at (isRateLimited only
  // queries the last RATE_LIMIT_WINDOW_MINUTES), so anything older than a
  // generous multiple of that window is safe to delete. Piggybacks on this
  // function specifically because it already only runs on a failed login —
  // rare compared to normal traffic — rather than adding a cleanup step to
  // every single request. Best-effort and non-blocking, same as the insert
  // above: a failed cleanup should never affect whether this login attempt
  // itself gets recorded or rate-limited correctly.
  try {
    await db.query(
      `DELETE FROM login_attempts WHERE attempted_at < (NOW() - INTERVAL ? MINUTE)`,
      [RATE_LIMIT_WINDOW_MINUTES * 8]
    );
  } catch (e) { /* best-effort — never let cleanup break the response */ }
}

async function authenticate(req, db) {
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD is not set — denying all requests until this is configured.');
    return { ok: false };
  }
  const adminPw = req.headers['x-admin-password'];
  if (adminPw) {
    if (await isRateLimited(db, '__admin__')) return { ok: false, rateLimited: true };
    if (adminPw === process.env.ADMIN_PASSWORD) {
      return { ok: true, username: 'admin', role: 'admin' };
    }
    await recordFailedAttempt(db, '__admin__');
  }
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];
  if (username && password) {
    if (await isRateLimited(db, username)) return { ok: false, rateLimited: true };
    try {
      const [rows] = await db.query(
        'SELECT id, username, role, password_hash FROM users WHERE username = ?',
        [username]
      );
      if (rows.length) {
        const { valid, needsUpgrade } = verifyPassword(password, rows[0].password_hash);
        if (valid) {
          if (needsUpgrade) {
            // Fire-and-forget — never let a hash upgrade block or fail the
            // login itself; worst case it just tries again next time.
            db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashPwStrong(password), rows[0].id]).catch(()=>{});
          }
          return { ok: true, username: rows[0].username, role: rows[0].role };
        }
      }
    } catch (e) { /* fall through to unauthorized */ }
    await recordFailedAttempt(db, username);
  }
  return { ok: false };
}

module.exports = async (req, res) => {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const resource = req.query.resource;

  // One connection opened for this entire request, closed in the finally
  // block below no matter how the request ends — success, error, or an
  // early return. This replaces the old pool-per-instance pattern that was
  // causing "Too many connections" on Aiven's free tier.
  const db = await getConnection();
  try {
    // Keep-alive ping — deliberately placed before the auth gate so a free
    // external monitor (e.g. UptimeRobot) can hit it with a plain GET, no
    // custom headers needed. Touches the database with a trivial query so the
    // connection stays warm and Aiven's free-tier inactivity auto-suspend never
    // triggers. Reveals nothing about your data.
    if (resource === 'ping') {
      await db.query('SELECT 1');
      // Version marker — lets you confirm from a plain browser visit whether
      // Vercel is actually running this file or a stale deployment. Bump the
      // string any time you need to re-verify a deploy took effect.
      return res.status(200).json({ ok: true, ts: Date.now(), version: 'single-connection-v5' });
    }

    const auth = await authenticate(req, db);
    if (auth.rateLimited) return res.status(429).json({ error: `Too many failed login attempts. Please wait ${RATE_LIMIT_WINDOW_MINUTES} minutes and try again.` });
    if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

    // Read-only users can GET anything. Writes (POST) normally require the
    // admin role — with ONE deliberate exception: the driving_person
    // resource, which a team_lead account is also allowed to write to.
    // That's the only field a team_lead can ever touch; every other
    // resource (including calls itself) stays admin-only, enforced here
    // server-side rather than just hidden in the UI.
    if (req.method === 'POST') {
      const allowedForTeamLead = resource === 'driving_person';
      // push_subscription (added 2026-10-02) is deliberately exempt from
      // the admin-only write gate entirely, for every role including a
      // read-only user: subscribing/unsubscribing a browser for push
      // alerts is a per-device notification preference, not a data edit —
      // it never touches calls/closures/roster/etc, so the usual "only
      // admin can write" reasoning doesn't apply here.
      const allowedForAnyRole = resource === 'push_subscription' || resource === 'chat';
      if (!allowedForAnyRole && auth.role !== 'admin' && !(auth.role === 'team_lead' && allowedForTeamLead)) {
        return res.status(403).json({ error: 'You do not have permission to save changes to this.' });
      }
    }

    if (resource === 'whoami') {
      return res.status(200).json({ username: auth.username, role: auth.role });
    }

    if (resource === 'calls') return await handleCalls(req, res, db);
    if (resource === 'all_calls') return await handleAllCalls(req, res, db);
    if (resource === 'roster') return await handleRoster(req, res, db);
    if (resource === 'notes') return await handleNotes(req, res, db);
    if (resource === 'dates') return await handleDates(req, res, db);
    if (resource === 'finalized') return await handleFinalized(req, res, db);
    if (resource === 'call_status') return await handleCallStatus(req, res, db);
    if (resource === 'call_backups') return await handleCallBackups(req, res, db);
    if (resource === 'students') return await handleStudents(req, res, db);
    if (resource === 'student_match_decisions') return await handleStudentMatchDecisions(req, res, db);
    if (resource === 'driving_person') return await handleDrivingPerson(req, res, db);
    if (resource === 'closures') return await handleClosures(req, res, db);
    if (resource === 'closure_manual_match') return await handleClosureManualMatch(req, res, db);
    if (resource === 'expected_closures') return await handleExpectedClosures(req, res, db);
    if (resource === 'app_settings') return await handleAppSettings(req, res, db);
    if (resource === 'push_subscription') return await handlePushSubscription(req, res, db);
    if (resource === 'portal_sync') return await handlePortalSync(req, res);
    if (resource === 'users') return await handleUsers(req, res, db);
    if (resource === 'chat') {
      if (!handleChat) return res.status(503).json({ error: 'Ask Desk is not installed on the server yet (api/_ask-desk-chat.js is missing).', code: 'not_configured' });
      return await handleChat(req, res, db, auth);
    }
    return res.status(400).json({ error: 'Unknown resource. Use ?resource=calls|all_calls|roster|notes|dates|finalized|call_status|portal_sync|call_backups|students|student_match_decisions|driving_person|closures|closure_manual_match|expected_closures|app_settings|push_subscription|users|chat|whoami' });
  } catch (err) {
    console.error(err);
    // FIX (2026-09-27): a save against a table that hasn't been created yet
    // (e.g. closure_manual_matches or app_settings, both added 2026-09-25 —
    // schema.sql lists them but they have to be run against the live
    // database by hand, they're never auto-created at request time) used to
    // fall through to the fully generic message below, which just looks
    // like "not stored" with no way to tell why. The missing table's own
    // name (it's already public in schema.sql, not sensitive) is safe and
    // genuinely actionable to hand back here — everything else about the
    // error (connection details, query text) still stays server-log-only.
    if (err && err.code === 'ER_NO_SUCH_TABLE') {
      const m = /Table '[^']*\.(\w+)' doesn't exist/.exec(err.sqlMessage || err.message || '');
      const tableName = m ? m[1] : 'a required table';
      return res.status(500).json({ error: `The "${tableName}" table doesn't exist in your database yet — run its CREATE TABLE statement from schema.sql, then try again.` });
    }
    // The full error (including internal details like table/column names,
    // or MySQL connection specifics) goes to the server log above, not to
    // the client — a generic message here avoids handing that detail to
    // anyone who happens to trigger an error, intentionally or not.
    return res.status(500).json({ error: 'Something went wrong on the server. Please try again, and check the Vercel function logs if it persists.' });
  } finally {
    // Always closes, no matter which branch above ran or whether it threw —
    // this is the piece that actually prevents connections from piling up.
    try { await db.end(); } catch (e) { /* already closed or never opened */ }
  }
};

// ---------- users (admin management) ----------
async function handleUsers(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query('SELECT id, username, role FROM users ORDER BY username');
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    const { action, id, username, password, role } = req.body || {};
    // Only three real role values exist — anything unrecognized falls back
    // to the safest option, 'user' (read-only), rather than accidentally
    // granting write access to a typo'd or unexpected value.
    const safeRole = (r) => (r === 'admin' || r === 'team_lead') ? r : 'user';
    if (action === 'create') {
      if (!username || !password) return res.status(400).json({ error: 'username and password required' });
      try {
        await db.query(
          'INSERT INTO users (id, username, password_hash, role) VALUES (?,?,?,?)',
          [newId(), username, hashPwStrong(password), safeRole(role)]
        );
        return res.status(200).json({ ok: true });
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'That username is already taken.' });
        throw e;
      }
    }
    if (action === 'setRole') {
      await db.query('UPDATE users SET role = ? WHERE id = ?', [safeRole(role), id]);
      return res.status(200).json({ ok: true });
    }
    if (action === 'resetPassword') {
      if (!password) return res.status(400).json({ error: 'password required' });
      await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashPwStrong(password), id]);
      return res.status(200).json({ ok: true });
    }
    if (action === 'delete') {
      await db.query('DELETE FROM users WHERE id = ?', [id]);
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: 'Unknown action. Use create|setRole|resetPassword|delete' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- calls ----------
async function handleCalls(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query param required' });
    let rows;
    try {
      // Left-joins in the reschedule/cancel tag AND the driving person —
      // both live in their own dedicated tables (see call_status_table.sql
      // and call_driving_person_table.sql) specifically so a routine full-
      // day resave of `calls` (which deletes and reinserts every row) can
      // never wipe either of them out.
      [rows] = await db.query(
        `SELECT c.*, cs.status AS cs_status, cs.status_fields_json AS cs_status_fields_json,
                cdp.driving_person AS cdp_driving_person
         FROM calls c
         LEFT JOIN call_status cs ON cs.call_id = c.id
         LEFT JOIN call_driving_person cdp ON cdp.call_id = c.id
         WHERE c.call_date = ?
         ORDER BY c.created_at`,
        [date]
      );
    } catch (e) {
      // One or both join tables don't exist yet — fall back so the app
      // still works; those fields just won't appear until the migration
      // has been run once.
      [rows] = await db.query('SELECT * FROM calls WHERE call_date = ? ORDER BY created_at', [date]);
    }
    const mapped = rows.map(rowToCall);
    return res.status(200).json({ rows: mapped });
  }
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    try {
      await db.beginTransaction();
      await db.query('DELETE FROM calls WHERE call_date = ?', [date]);
      if (rows.length) {
        // Single batched INSERT for every row instead of one round-trip per row —
        // with 100+ calls in a day, looping one-at-a-time made every save take
        // several seconds. One statement covers the whole day at once.
        // Reschedule/cancel status is intentionally NOT part of this insert —
        // it lives in the separate call_status table (see handleCallStatus)
        // so a routine call edit here can never touch or wipe it out.
        const values = rows.map(r => [
          r.id, date, r.time||'', r.candidate||'', r.company||'', r.round||'', r.duration||'',
          r.woi?1:0, r.assignee||'', r.country||'USA', JSON.stringify(r.doubts||[]), r.raw||'',
          r.interviewer||'', r.importance||'', r.role||'', r.technicalPOC||'',
          r.onsite?1:0, r.candidateFirstInterview?1:0
        ]);
        await db.query(
          `INSERT INTO calls (id, call_date, time_text, candidate, company, round_text, duration, is_woi, assignee, country, doubts_json, raw_text, interviewer, importance, role, technical_poc, is_onsite, is_candidate_first_interview)
           VALUES ?`,
          [values]
        );
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
// ---------- all_calls: every call on file, in ONE request (added 2026-10-02) ----------
// PERF: every "scan the whole board" feature (Stuck Pipeline, Company
// Scorecard, WOI Aging, Closures matching, the Candidate search fallback,
// etc. — see fetchAllRowsAcrossDates() in index.html) used to fetch the
// `dates` list and then fire one `calls?date=...` request PER saved date,
// all in parallel. That's correct, but each of those requests opens its
// own fresh database connection (see getConnection()'s comment on why this
// API never pools connections) — so a single "scan everything" action
// could briefly open dozens of simultaneous connections once history grows
// to months/years of dates, right up against Aiven's free-tier connection
// cap. This collapses that into exactly one query / one connection. Same
// joins and row shape as handleCalls' GET, just without the date filter —
// each row carries its own call_date (as `_date`, matching the field name
// the frontend already attaches to rows from the old per-date loop) so the
// client can group by date itself without a second round trip.
async function handleAllCalls(req, res, db) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  let rows;
  try {
    [rows] = await db.query(
      `SELECT c.*, cs.status AS cs_status, cs.status_fields_json AS cs_status_fields_json,
              cdp.driving_person AS cdp_driving_person
       FROM calls c
       LEFT JOIN call_status cs ON cs.call_id = c.id
       LEFT JOIN call_driving_person cdp ON cdp.call_id = c.id
       ORDER BY c.call_date, c.created_at`
    );
  } catch (e) {
    // Same fallback as handleCalls — one or both join tables don't exist
    // yet (migration not run), so the app still works, just without
    // status/driving-person fields until that migration happens.
    [rows] = await db.query('SELECT * FROM calls ORDER BY call_date, created_at');
  }
  const mapped = rows.map(r => Object.assign(rowToCall(r), { _date: formatDate(r.call_date) }));
  return res.status(200).json({ rows: mapped });
}
function rowToCall(row) {
  return {
    id: row.id,
    time: row.time_text,
    candidate: row.candidate,
    company: row.company,
    round: row.round_text,
    duration: row.duration,
    woi: !!row.is_woi,
    assignee: row.assignee,
    country: row.country,
    doubts: safeParse(row.doubts_json, []),
    raw: row.raw_text || '',
    interviewer: row.interviewer || '',
    importance: row.importance || '',
    role: row.role || '',
    technicalPOC: row.technical_poc || '',
    onsite: !!row.is_onsite,
    candidateFirstInterview: !!row.is_candidate_first_interview,
    drivingPerson: row.cdp_driving_person || '',
    status: row.cs_status || row.status || '',
    statusFields: safeParse(row.cs_status_fields_json || row.status_fields_json, []),
  };
}
function safeParse(text, fallback) {
  try { return JSON.parse(text); } catch (e) { return fallback; }
}

// ---------- call_status (reschedule / cancel tags) ----------
// A dedicated table, keyed by call_id, completely separate from `calls`.
// Tagging a call as rescheduled/cancelled never depends on `calls` having
// (or not having) a status column, and saving normal call edits — which
// deletes and reinserts that whole day's calls rows — can never touch or
// wipe these tags out, since they live in a different table entirely.
async function handleCallStatus(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query param required' });
    const [rows] = await db.query(
      'SELECT call_id, status, reason, status_fields_json FROM call_status WHERE call_date = ?',
      [date]
    );
    return res.status(200).json({
      rows: rows.map(r => ({
        callId: r.call_id,
        status: r.status,
        reason: r.reason || '',
        statusFields: safeParse(r.status_fields_json, []),
      })),
    });
  }
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    try {
      await db.beginTransaction();
      // Full replace for the date — the frontend always sends the complete
      // current set of tagged calls for this date, same delete-then-insert
      // pattern already used for notes/roster.
      await db.query('DELETE FROM call_status WHERE call_date = ?', [date]);
      if (rows.length) {
        const values = rows.map(r => [
          r.callId, date, r.status || '', r.reason || '', JSON.stringify(r.statusFields || [])
        ]);
        await db.query(
          `INSERT INTO call_status (call_id, call_date, status, reason, status_fields_json) VALUES ?`,
          [values]
        );
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}


// ---------- roster ----------
async function handleRoster(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query('SELECT * FROM roster ORDER BY team, name');
    return res.status(200).json({
      rows: rows.map(r => ({ id: r.id, name: r.name, team: r.team, advanced: !!r.is_advanced })),
    });
  }
  if (req.method === 'POST') {
    const { rows } = req.body;
    if (!Array.isArray(rows)) return res.status(400).json({ error: 'rows[] required' });
    try {
      await db.beginTransaction();
      await db.query('DELETE FROM roster');
      if (rows.length) {
        const values = rows.map(p => [p.id, p.name, p.team, p.advanced ? 1 : 0]);
        await db.query('INSERT INTO roster (id, name, team, is_advanced) VALUES ?', [values]);
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- notes ----------
async function handleNotes(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query param required' });
    const [rows] = await db.query('SELECT id, note_text AS text FROM notes WHERE note_date = ? ORDER BY created_at', [date]);
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    try {
      await db.beginTransaction();
      await db.query('DELETE FROM notes WHERE note_date = ?', [date]);
      if (rows.length) {
        const values = rows.map(n => [n.id, date, n.text]);
        await db.query('INSERT INTO notes (id, note_date, note_text) VALUES ?', [values]);
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- finalized flag ----------
async function handleFinalized(req, res, db) {
  if (req.method === 'GET') {
    const { date } = req.query;
    const [rows] = await db.query('SELECT finalized FROM day_status WHERE the_date = ?', [date]);
    return res.status(200).json({ finalized: rows.length ? !!rows[0].finalized : false });
  }
  if (req.method === 'POST') {
    const { date, finalized } = req.body;
    await db.query(
      'INSERT INTO day_status (the_date, finalized) VALUES (?,?) ON DUPLICATE KEY UPDATE finalized = ?',
      [date, finalized ? 1 : 0, finalized ? 1 : 0]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- distinct dates (for the repeat-candidate notification scan) ----------
async function handleDates(req, res, db) {
  const [rows] = await db.query('SELECT DISTINCT call_date FROM calls ORDER BY call_date');
  return res.status(200).json({ dates: rows.map(r => formatDate(r.call_date)) });
}
function formatDate(d) {
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10);
}

// ---------- students (the full active-student master list — separate from
// `roster`, which is just the small daily coordinator/team list). Deliberately
// minimal: just name + country, per the actual current need. ----------
async function handleStudents(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query('SELECT * FROM students ORDER BY name');
    return res.status(200).json({
      rows: rows.map(r => ({ id: r.id, name: r.name, country: r.country })),
    });
  }
  if (req.method === 'POST') {
    const { rows } = req.body;
    if (!Array.isArray(rows)) return res.status(400).json({ error: 'rows[] required' });
    try {
      await db.beginTransaction();
      await db.query('DELETE FROM students');
      if (rows.length) {
        const values = rows.map(s => [s.id, s.name || '', s.country || '']);
        await db.query('INSERT INTO students (id, name, country) VALUES ?', [values]);
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: rows.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- student_match_decisions: a human's confirm/reject verdict on a
// fuzzy (non-exact) candidate-name-to-Students-Master match ----------
// Not date-scoped — a candidate's name and which master-list student they
// really are doesn't depend on which date their call happened to land on,
// so this is a single global table. Unlike the other resources here, this
// is an incremental single-record upsert rather than delete-then-insert:
// decisions accumulate one at a time over an open-ended period, and
// resending the whole growing list on every single confirm/reject would
// only get more wasteful over time.
async function handleStudentMatchDecisions(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query(
      'SELECT candidate_key, student_id, decision FROM student_match_decisions'
    );
    return res.status(200).json({
      rows: rows.map(r => ({ candidateKey: r.candidate_key, studentId: r.student_id, decision: r.decision })),
    });
  }
  if (req.method === 'POST') {
    const { candidateKey, candidateName, studentId, decision } = req.body;
    if (!candidateKey || !studentId || !decision) {
      return res.status(400).json({ error: 'candidateKey, studentId, and decision are required' });
    }
    if (decision !== 'confirmed' && decision !== 'rejected') {
      return res.status(400).json({ error: 'decision must be "confirmed" or "rejected"' });
    }
    // ON DUPLICATE KEY UPDATE so someone changing their mind later (e.g.
    // rejected, then later realizes it really was the same person) just
    // overwrites the earlier verdict rather than erroring or duplicating.
    await db.query(
      `INSERT INTO student_match_decisions (candidate_key, candidate_name, student_id, decision)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE decision = VALUES(decision), candidate_name = VALUES(candidate_name)`,
      [candidateKey, candidateName || '', studentId, decision]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
// This proxies a server-to-server call to the existing Apps Script Web App
// bridge (PortalCoverageDeskExport.gs) — never called from the browser
// directly, since that would expose the portal secret. GET only; there is
// no write path here at all, matching the bridge's own read-only design.
// Env vars required (Vercel -> Project -> Settings -> Environment Variables):
//   PORTAL_BRIDGE_URL           - the Apps Script /exec URL for Interview Portal Control
//   COVERAGE_DESK_PORTAL_SECRET - the secret generated by generateCoverageDeskExportSecret()
async function handlePortalSync(req, res) {
  if (req.method === 'GET') {
    // Fast path: return whatever was last cached in the DB, without
    // touching the slow Apps Script bridge at all. Used to show data
    // instantly on load; the person then explicitly triggers a fresh
    // pull with one of the sync buttons.
    if (req.query.cached === '1') {
      return await handlePortalSyncCacheRead(req, res);
    }
    return await handlePortalSyncFetch(req, res);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// Env vars required (Vercel -> Project -> Settings -> Environment Variables):
//   PORTAL_BRIDGE_URL           - the Apps Script /exec URL for Interview Portal Control
//   COVERAGE_DESK_PORTAL_SECRET - the secret generated by generateCoverageDeskExportSecret()
async function handlePortalSyncFetch(req, res) {
  const bridgeUrl = process.env.PORTAL_BRIDGE_URL;
  const secret = process.env.COVERAGE_DESK_PORTAL_SECRET;
  if (!bridgeUrl || !secret) {
    return res.status(500).json({ error: 'Portal sync is not configured. Set PORTAL_BRIDGE_URL and COVERAGE_DESK_PORTAL_SECRET in Vercel env vars.' });
  }

  const resourceRequested = req.query.type === 'assignments' || req.query.type === 'incentives'
    ? req.query.type
    : 'everything';
  const date = req.query.date || '';   // yyyy-MM-dd — when present, fast day-scoped pull
  const month = req.query.month || '';

  try {
    const upstream = await fetch(bridgeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'coverageDesk', secret, resource: resourceRequested, date, month }),
    });
    const text = await upstream.text();
    let parsed;
    try { parsed = JSON.parse(text); }
    catch (e) { return res.status(502).json({ error: 'Portal bridge returned a non-JSON response — check the Apps Script deployment.' }); }

    if (!parsed || parsed.ok !== true) {
      return res.status(502).json({ error: (parsed && parsed.error) || 'Portal bridge request failed.' });
    }

    // Cache the result so the next page load (or a failed future sync)
    // still has something real to show, and so this data survives a
    // browser refresh instead of living only in memory.
    // FIX (2026-09-24): a cache write failure here used to only be
    // console.error'd server-side - invisible to Saiteja and to the
    // frontend, which would happily report the sync as fully successful
    // even though nothing durable was actually saved. Now every failure
    // (main key, or any per-date fan-out key) is collected into
    // `cacheWarnings` and returned to the caller as `cacheWarning` on the
    // response, so the UI can show it instead of silently losing data.
    // Same month-scoping fix as the read side (handlePortalSyncCacheRead) —
    // incentives requests carry `month`, not `date`, so without this an
    // incentives sync for any month always overwrote the same shared
    // "incentives:ALL" cache row, making month-scoped caching impossible.
    const cacheKey = resourceRequested + ':' + (date || month || 'ALL');
    const cacheWarnings = [];
    try {
      const db = await getConnection();
      try {
        await db.query(
          'INSERT INTO portal_sync_cache (cache_key, data_json) VALUES (?,?) ON DUPLICATE KEY UPDATE data_json = ?',
          [cacheKey, JSON.stringify(parsed.data), JSON.stringify(parsed.data)]
        );
        // FIX (2026-09-24): a Full Sync (no `date` in the request) only ever
        // wrote ONE cache row - "assignments:ALL" - covering every date it
        // pulled. That key gets overwritten wholesale by the next Full Sync,
        // so any date whose ONLY sync was ever a Full Sync had no snapshot
        // of its own; the frontend could only ever show "whatever the most
        // recent Full Sync happened to return", not what was true for that
        // date at the time it was actually synced. Reported by Saiteja as
        // Portal data looking wiped out when switching to those dates.
        // Now also fans a Full Sync's assignments out into their own
        // per-date cache keys ("assignments:<dateKey>"), same as a real
        // "Sync Today" run for that date would have written - so every date
        // a Full Sync ever covered gets its own real, independently-updated
        // snapshot going forward, not just a share of the single ALL blob.
        if (!date && resourceRequested === 'assignments' && Array.isArray(parsed.data)) {
          const byDate = {};
          for (const row of parsed.data) {
            const d = row && row.dateKey;
            if (!d) continue;
            (byDate[d] = byDate[d] || []).push(row);
          }
          for (const [d, rows] of Object.entries(byDate)) {
            const perDateKey = 'assignments:' + d;
            const json = JSON.stringify(rows);
            try {
              await db.query(
                'INSERT INTO portal_sync_cache (cache_key, data_json) VALUES (?,?) ON DUPLICATE KEY UPDATE data_json = ?',
                [perDateKey, json, json]
              );
            } catch (perDateErr) {
              // One date's write failing should never block the others or
              // the overall sync - log and keep going, but still surface it.
              console.error('portal_sync_cache per-date write failed for', perDateKey, perDateErr);
              cacheWarnings.push('Could not save a per-date snapshot for ' + d + '.');
            }
          }
        }
      } finally {
        await db.end();
      }
    } catch (cacheErr) {
      // Caching failure should never block returning fresh data to the user,
      // but it does mean this sync won't survive a refresh or a future
      // read-from-cache, so the caller needs to know.
      console.error('portal_sync_cache write failed:', cacheErr);
      cacheWarnings.push('Fresh data loaded, but it could not be saved for later (cache write failed). It may disappear after a refresh until the next successful sync.');
    }

    const cacheWarning = cacheWarnings.length ? cacheWarnings.join(' ') : null;
    return res.status(200).json({ ok: true, data: parsed.data, generatedAt: parsed.generatedAt || null, cached: false, cacheWarning });
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach the Portal bridge: ' + err.message });
  }
}

// Reads back whatever was last cached for this key, without calling the
// slow Apps Script bridge. Returns null data if nothing has ever been
// synced yet for this key.
async function handlePortalSyncCacheRead(req, res) {
  const resourceRequested = req.query.type === 'assignments' || req.query.type === 'incentives'
    ? req.query.type
    : 'everything';
  const date = req.query.date || '';
  const month = req.query.month || '';
  // FIX (2026-10-02): incentives requests are scoped by MONTH, not date (see
  // the matching fix in handlePortalSyncFetch's write side below) — this
  // read path previously ignored `month` entirely, so every incentives
  // cache lookup hit the single "incentives:ALL" key regardless of which
  // month was actually being viewed. That made month-scoped caching
  // impossible: syncing October's incentives would silently return as
  // September's (or vice versa) the moment more than one month had ever
  // been synced.
  const cacheKey = resourceRequested + ':' + (date || month || 'ALL');

  const db = await getConnection();
  try {
    const [rows] = await db.query('SELECT data_json, updated_at FROM portal_sync_cache WHERE cache_key = ?', [cacheKey]);
    if (!rows.length) {
      return res.status(200).json({ ok: true, data: null, generatedAt: null, cached: true });
    }
    let data;
    try { data = JSON.parse(rows[0].data_json); } catch (e) { data = null; }
    return res.status(200).json({ ok: true, data, generatedAt: rows[0].updated_at, cached: true });
  } finally {
    await db.end();
  }
}

// ---------- call_backups: automatic pre-risky-operation snapshots ----------
// GET (no id): list backups for a date, most recent first, WITHOUT the
//   full payload (keeps the list fast even with many backups).
// GET (with id): full snapshot for one specific backup, for restoring.
// POST: create a new backup — called automatically before import, clear
//   all, and finalize.
//
// FIX: this used to never prune old backups at all — "a safety net, not a
// rolling log". Still true in spirit: nothing here ever deletes a backup
// from the last 90 days, so anything recent enough to plausibly matter for
// an undo is always there. Only backups older than that get cleaned up,
// piggybacked onto this POST handler (new-backup creation) the same
// best-effort, non-blocking way login_attempts cleanup piggybacks onto
// recordFailedAttempt — never lets a cleanup failure affect the actual
// backup being saved right now.
const CALL_BACKUPS_RETENTION_DAYS = 90;
async function handleCallBackups(req, res, db) {
  if (req.method === 'GET') {
    const { date, id } = req.query;
    if (id) {
      const [rows] = await db.query('SELECT id, call_date, reason, snapshot_json, row_count, created_at FROM call_backups WHERE id = ?', [id]);
      if (!rows.length) return res.status(404).json({ error: 'Backup not found' });
      return res.status(200).json({ backup: rows[0] });
    }
    if (!date) return res.status(400).json({ error: 'date or id query param required' });
    const [rows] = await db.query('SELECT id, call_date, reason, row_count, created_at FROM call_backups WHERE call_date = ? ORDER BY created_at DESC LIMIT 30', [date]);
    return res.status(200).json({ backups: rows });
  }
  if (req.method === 'POST') {
    const { date, reason, rows } = req.body;
    if (!date || !reason || !Array.isArray(rows)) return res.status(400).json({ error: 'date, reason, and rows[] required' });
    await db.query(
      'INSERT INTO call_backups (call_date, reason, snapshot_json, row_count) VALUES (?,?,?,?)',
      [date, reason, JSON.stringify(rows), rows.length]
    );
    try {
      await db.query(
        `DELETE FROM call_backups WHERE created_at < (NOW() - INTERVAL ? DAY)`,
        [CALL_BACKUPS_RETENTION_DAYS]
      );
    } catch (e) { /* best-effort — never let cleanup affect the backup just saved */ }
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- driving_person: the ONE field a Team Lead account can write ----------
// Its own dedicated table, keyed by call_id — same reasoning as
// call_status: living in the main `calls` table would mean a routine
// full-day resave (which deletes and reinserts every row for that date)
// could silently wipe out whatever a Team Lead had set, if the admin
// doing that resave had stale data loaded. Keeping it separate means that
// can never happen, no matter which account saves what, in which order.
async function handleDrivingPerson(req, res, db) {
  if (req.method === 'POST') {
    const { date, rows } = req.body;
    if (!date || !Array.isArray(rows)) return res.status(400).json({ error: 'date and rows[] required' });
    try {
      await db.beginTransaction();
      // Full replace for the date — same delete-then-insert pattern as
      // call_status/notes/roster. The frontend always sends the complete
      // current set of driving-person values for this date.
      await db.query('DELETE FROM call_driving_person WHERE call_date = ?', [date]);
      const withValue = rows.filter(r => r.callId && r.drivingPerson);
      if (withValue.length) {
        const values = withValue.map(r => [r.callId, date, r.drivingPerson]);
        await db.query(
          'INSERT INTO call_driving_person (call_id, call_date, driving_person) VALUES ?',
          [values]
        );
      }
      await db.commit();
      return res.status(200).json({ ok: true, count: withValue.length });
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- closures: job-offer / placement outcomes ----------
// Append-only log, deliberately NOT date-scoped — a closure gets reported
// whenever the offer actually happens, which is often days or weeks after
// the interview itself, so it doesn't fit the "one day's data" pattern
// the rest of this app uses (calls, notes, roster). GET returns
// everything, newest first, capped at the most recent 500 so the list
// stays fast to load even after a long history. POST only ever appends —
// never overwrites — since closures are historical facts, not something
// meant to be silently replaced by a later save the way a day's calls are.
async function handleClosures(req, res, db) {
  if (req.method === 'GET') {
    // FIX (2026-10-01): `created_at` was never aliased to the `createdAt`
    // the frontend actually reads (loadClosures() does `createdAt:
    // r.createdAt`) — mysql2 returns raw column names, so every closure's
    // createdAt has silently been `undefined` since this endpoint was
    // written. That made every single closure fall into the "Undated"
    // bucket in the All Closures month-grouped list (not just September —
    // ALL of them), and made the "Closures in <Month>" stat card always
    // show 0, since both of those read c.createdAt. Confirmed against the
    // live database: 28 real closures exist for September 2026 alone, none
    // of which were showing up grouped under their real month in the app.
    const [rows] = await db.query(
      'SELECT id, candidate, company, salary, raw_text, recorded_by, created_at AS createdAt FROM closures ORDER BY created_at DESC LIMIT 500'
    );
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    // Delete — a closure entered by mistake (wrong candidate, duplicate
    // paste-in, test data) needs to be removable, even though the normal
    // path (a real offer/placement) is append-only by design (see the file
    // comment above). Uses the same {action:'delete', id} shape as
    // handleUsers below rather than a real HTTP DELETE, since this API's
    // CORS policy only allows GET/POST. Also clears any manual-match
    // pointer for that closure (closure_manual_matches has no FK/cascade of
    // its own) so a later closure reusing the same id can't inherit a
    // stale routing row that was never meant for it.
    if (req.body && req.body.action === 'delete') {
      const id = Number(req.body.id);
      if (!id || !Number.isInteger(id)) return res.status(400).json({ error: 'id (integer) required' });
      await db.query('DELETE FROM closures WHERE id = ?', [id]);
      await db.query('DELETE FROM closure_manual_matches WHERE closure_id = ?', [id]);
      return res.status(200).json({ ok: true });
    }
    const { rows } = req.body;
    if (!Array.isArray(rows) || !rows.length) return res.status(400).json({ error: 'rows[] required' });
    const recordedBy = req.headers['x-username'] || 'admin'; // 'admin' when using the shared master password, which has no per-account username
    const values = rows.map(r => [
      (r.candidate || '').trim(),
      (r.company || '').trim(),
      (r.salary || '').trim(),
      r.rawText || '',
      recordedBy,
    ]);
    if (values.some(v => !v[0] || !v[1])) return res.status(400).json({ error: 'Each row needs at least a candidate and a company' });
    await db.query(
      'INSERT INTO closures (candidate, company, salary, raw_text, recorded_by) VALUES ?',
      [values]
    );
    return res.status(200).json({ ok: true, count: values.length });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- expected_closures: "likely closure" flags awaiting follow-up ----------
// Added 2026-10-01 — Saiteja: "who is in the call, we can except [accept]
// this as closures depends on the call feedback by handlers or driving
// persons... if we do this we can follow up the updates regarding this...
// let's say like a remainder [reminder]." A holding area that sits BEFORE
// the real (confirmed) `closures` table above — flagging a call here never
// writes into that append-only log. GET returns everything on file
// (capped at 500, oldest-flagged-first is handled client-side so the
// stalest follow-ups surface first). POST appends new flags, or — via the
// {action:...} shape also used by handleClosures above — deletes a flag
// ('delete') or logs a follow-up check-in ('followup'). There's no
// separate "confirm" action here: the frontend's confirmExpectedClosure()
// promotes a flag into a real closure by calling the `closures` resource
// directly (same INSERT path a pasted-in message uses) and then deletes
// the flag here — once it's a real closure it belongs in exactly one
// table, not two.
async function handleExpectedClosures(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query(
      `SELECT id, call_id AS callId, call_date AS callDate, candidate, company, round_text AS round,
              note, flagged_by AS flaggedBy, created_at AS createdAt,
              last_followup_at AS lastFollowupAt, last_followup_note AS lastFollowupNote
       FROM expected_closures ORDER BY created_at DESC LIMIT 500`
    );
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    if (req.body && req.body.action === 'delete') {
      const id = Number(req.body.id);
      if (!id || !Number.isInteger(id)) return res.status(400).json({ error: 'id (integer) required' });
      await db.query('DELETE FROM expected_closures WHERE id = ?', [id]);
      return res.status(200).json({ ok: true });
    }
    if (req.body && req.body.action === 'followup') {
      const id = Number(req.body.id);
      if (!id || !Number.isInteger(id)) return res.status(400).json({ error: 'id (integer) required' });
      const note = (req.body.note || '').trim();
      await db.query(
        'UPDATE expected_closures SET last_followup_at = NOW(), last_followup_note = ? WHERE id = ?',
        [note, id]
      );
      return res.status(200).json({ ok: true });
    }
    const { rows } = req.body;
    if (!Array.isArray(rows) || !rows.length) return res.status(400).json({ error: 'rows[] required' });
    const flaggedBy = req.headers['x-username'] || 'admin';
    const values = rows.map(r => [
      r.callId || null,
      r.callDate || '',
      (r.candidate || '').trim(),
      (r.company || '').trim(),
      r.round || '',
      r.note || '',
      flaggedBy,
    ]);
    if (values.some(v => !v[2] || !v[3])) return res.status(400).json({ error: 'Each row needs at least a candidate and a company' });
    await db.query(
      'INSERT INTO expected_closures (call_id, call_date, candidate, company, round_text, note, flagged_by) VALUES ?',
      [values]
    );
    return res.status(200).json({ ok: true, count: values.length });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- closure_manual_match: manual closure<->call pointers ----------
// A closure is append-only (see handleClosures above) — this table is
// deliberately separate, not a column on `closures` itself, so a manual
// match stays a correctable "this closure's real candidate/company
// spelling, as it appears on an actual call record" pointer layered on
// top, never a rewrite of the original historical closure text. One row
// per closure (closure_id is the primary key), so re-matching the same
// closure a second time just overwrites its own pointer — that's fine,
// this is current-best-guess routing data, not a historical fact the way
// the closure itself is. GET returns every override on file; POST
// upserts exactly one.
async function handleClosureManualMatch(req, res, db) {
  if (req.method === 'GET') {
    const [rows] = await db.query(
      'SELECT closure_id AS closureId, candidate, company FROM closure_manual_matches'
    );
    return res.status(200).json({ rows });
  }
  if (req.method === 'POST') {
    const { closureId, candidate, company } = req.body || {};
    const cid = Number(closureId);
    if (!cid || !Number.isInteger(cid)) return res.status(400).json({ error: 'closureId (integer) required' });
    const cand = (candidate || '').trim(), comp = (company || '').trim();
    if (!cand || !comp) return res.status(400).json({ error: 'candidate and company (matching an existing call record) are required' });
    await db.query(
      'INSERT INTO closure_manual_matches (closure_id, candidate, company) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE candidate = VALUES(candidate), company = VALUES(company)',
      [cid, cand, comp]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- app_settings: a small generic key/value store ----------
// For simple, single-value admin-set settings that don't warrant their
// own table — the first use is the monthly incentive/closure goal
// (2026-09-25), but this is deliberately generic (key/value, not
// "incentive_target" hard-coded into the schema) so a future setting like
// this doesn't need its own migration. GET (no key) returns everything as
// {key: value}; GET with ?key= returns just that one; POST upserts one
// key. Values are always stored as text — the frontend is responsible
// for parsing (e.g. Number()) whatever it expects back.
async function handleAppSettings(req, res, db) {
  if (req.method === 'GET') {
    if (req.query.key) {
      const [rows] = await db.query('SELECT setting_value FROM app_settings WHERE setting_key = ?', [req.query.key]);
      return res.status(200).json({ value: rows.length ? rows[0].setting_value : null });
    }
    const [rows] = await db.query('SELECT setting_key, setting_value FROM app_settings');
    const settings = {};
    rows.forEach(r => { settings[r.setting_key] = r.setting_value; });
    return res.status(200).json({ settings });
  }
  if (req.method === 'POST') {
    const { key, value } = req.body || {};
    const k = (key || '').trim();
    if (!k) return res.status(400).json({ error: 'key is required' });
    await db.query(
      'INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
      [k, String(value == null ? '' : value)]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// ---------- push_subscription: Web Push subscriptions (added 2026-10-02) ----------
// The frontend's "🔔 Alerts" toggle (index.html's toggleTimeSensitiveAlerts)
// also registers a real PushManager subscription here once background push
// is turned on — GET returns a bare count only (for a quick admin sanity
// check, never the subscriptions themselves), POST saves/removes exactly
// one subscription for the calling device. Sending the actual push
// notifications is NOT done here — see api/check-push-alerts.js, a
// separate isolated endpoint (same "keep it isolated" reasoning as
// api/auth.js and api/cron-portal-sync.js) meant to be hit every few
// minutes by an external scheduler.
async function handlePushSubscription(req, res, db) {
  if (req.method === 'GET') {
    const [[{ count }]] = await db.query('SELECT COUNT(*) AS count FROM push_subscriptions');
    return res.status(200).json({ count });
  }
  if (req.method === 'POST') {
    if (req.body && req.body.action === 'delete') {
      const endpoint = (req.body.endpoint || '').trim();
      if (!endpoint) return res.status(400).json({ error: 'endpoint is required' });
      const endpointHash = crypto.createHash('sha256').update(endpoint).digest('hex');
      await db.query('DELETE FROM push_subscriptions WHERE endpoint_hash = ?', [endpointHash]);
      return res.status(200).json({ ok: true });
    }
    const sub = req.body && req.body.subscription;
    if (!sub || !sub.endpoint || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
      return res.status(400).json({ error: 'A valid push subscription object ({endpoint, keys:{p256dh, auth}}) is required' });
    }
    const endpointHash = crypto.createHash('sha256').update(sub.endpoint).digest('hex');
    await db.query(
      `INSERT INTO push_subscriptions (endpoint_hash, endpoint, p256dh, auth_key)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE endpoint = VALUES(endpoint), p256dh = VALUES(p256dh), auth_key = VALUES(auth_key)`,
      [endpointHash, sub.endpoint, sub.keys.p256dh, sub.keys.auth]
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// Exposes handlePortalSyncFetch (2026-09-25) so api/cron-portal-sync.js —
// a separate, isolated function triggered by Vercel's own Cron Jobs, not
// by the browser — can reuse the exact same "pull fresh Portal data and
// save it to portal_sync_cache" logic the in-app "Full Sync" button
// already calls, rather than a second, drift-prone copy of it. The
// default export (the actual ?resource= router) is untouched — this is
// purely an additional named export alongside it.
module.exports.handlePortalSyncFetch = handlePortalSyncFetch;
module.exports.getConnection = getConnection;
