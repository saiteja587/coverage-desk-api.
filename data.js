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
const crypto = require('crypto');

function hashPw(pw) {
  return crypto.createHash('sha256').update(String(pw)).digest('hex');
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

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

// Checks who's making the request. The ADMIN_PASSWORD env var is a master key
// that always grants admin access (also used to create the first real user
// accounts). Beyond that, individual accounts in the `users` table log in with
// their own username/password and carry their own role ('admin' or 'user').
// If ADMIN_PASSWORD isn't set at all, the app stays fully open — unchanged
// from before per-user accounts existed, so nothing breaks for setups that
// never opted into any of this.
async function authenticate(req, db) {
  if (!process.env.ADMIN_PASSWORD) return { ok: true, username: null, role: 'admin' };
  const adminPw = req.headers['x-admin-password'];
  if (adminPw && adminPw === process.env.ADMIN_PASSWORD) {
    return { ok: true, username: 'admin', role: 'admin' };
  }
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];
  if (username && password) {
    try {
      const [rows] = await db.query(
        'SELECT username, role FROM users WHERE username = ? AND password_hash = ?',
        [username, hashPw(password)]
      );
      if (rows.length) return { ok: true, username: rows[0].username, role: rows[0].role };
    } catch (e) { /* fall through to unauthorized */ }
  }
  return { ok: false };
}

module.exports = async (req, res) => {
  setCors(res);
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
    if (!auth.ok) return res.status(401).json({ error: 'Unauthorized' });

    // Read-only users can GET anything, but any write (POST) — including
    // managing other users — requires the admin role.
    if (req.method === 'POST' && auth.role !== 'admin') {
      return res.status(403).json({ error: 'Read-only account — admin permission required to save changes.' });
    }

    if (resource === 'whoami') {
      return res.status(200).json({ username: auth.username, role: auth.role });
    }

    if (resource === 'calls') return await handleCalls(req, res, db);
    if (resource === 'roster') return await handleRoster(req, res, db);
    if (resource === 'notes') return await handleNotes(req, res, db);
    if (resource === 'dates') return await handleDates(req, res, db);
    if (resource === 'finalized') return await handleFinalized(req, res, db);
    if (resource === 'call_status') return await handleCallStatus(req, res, db);
    if (resource === 'users') return await handleUsers(req, res, db);
    return res.status(400).json({ error: 'Unknown resource. Use ?resource=calls|roster|notes|dates|finalized|call_status|users|whoami' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
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
    if (action === 'create') {
      if (!username || !password) return res.status(400).json({ error: 'username and password required' });
      try {
        await db.query(
          'INSERT INTO users (id, username, password_hash, role) VALUES (?,?,?,?)',
          [newId(), username, hashPw(password), role === 'admin' ? 'admin' : 'user']
        );
        return res.status(200).json({ ok: true });
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'That username is already taken.' });
        throw e;
      }
    }
    if (action === 'setRole') {
      await db.query('UPDATE users SET role = ? WHERE id = ?', [role === 'admin' ? 'admin' : 'user', id]);
      return res.status(200).json({ ok: true });
    }
    if (action === 'resetPassword') {
      if (!password) return res.status(400).json({ error: 'password required' });
      await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashPw(password), id]);
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
      // Left-joins in the reschedule/cancel tag from the separate call_status
      // table, if it's been created (see call_status_table.sql).
      [rows] = await db.query(
        `SELECT c.*, cs.status AS cs_status, cs.status_fields_json AS cs_status_fields_json
         FROM calls c
         LEFT JOIN call_status cs ON cs.call_id = c.id
         WHERE c.call_date = ?
         ORDER BY c.created_at`,
        [date]
      );
    } catch (e) {
      // call_status table doesn't exist yet — fall back so the app still
      // works; reschedule tags just won't appear until the migration has
      // been run once.
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
          r.interviewer||'', r.importance||''
        ]);
        await db.query(
          `INSERT INTO calls (id, call_date, time_text, candidate, company, round_text, duration, is_woi, assignee, country, doubts_json, raw_text, interviewer, importance)
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
