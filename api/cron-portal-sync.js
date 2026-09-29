// api/cron-portal-sync.js
// A separate, isolated serverless function — deliberately NOT part of
// api/data.js's ?resource= router, same "keep it isolated" reasoning
// api/auth.js already uses for login — triggered nightly by Vercel's own
// Cron Jobs (see vercel.json's "crons" entry), never by the browser or by
// any Coverage Desk session itself.
//
// Two jobs now, run in this order every night:
//   1. Pull fresh Portal data (handlePortalSyncFetch, reused directly from
//      api/data.js rather than a second, drift-prone copy of the same
//      logic) so it's already sitting in portal_sync_cache before anyone
//      opens the app the next day.
//   2. Backfill Driving Person from that fresh data, across EVERY date on
//      file — not just today's. Added 2026-09-29, a server-side port of
//      the in-app "🔄 Backfill Driving Person" button (index.html,
//      computeDrivingPersonBackfillPlan/fillDrivingPersonFromPortal),
//      because that button only ever runs when Saiteja remembers to click
//      it. This makes the same safe fix (1st Round only, never overwrites
//      an existing value, never touches advanced rounds — those stay a
//      human decision same as everywhere else in this app) happen on its
//      own every night instead.
//
// Added 2026-09-25 after Saiteja asked for an automatic nightly sync.
// Deliberately built as a real Vercel Cron Job (server-triggered,
// running on Vercel's own infrastructure) rather than a Claude scheduled
// task that would call this API from the outside — a live test from that
// direction hit a 403 from Claude's own outbound network policy for this
// account, confirmed NOT an issue with this app or Vercel, but not
// something worth depending on either. A cron job defined in vercel.json
// runs on Vercel itself, so it doesn't depend on any external caller
// being reachable at all.
//
// Security: Vercel's own Cron system automatically sends an
// "Authorization: Bearer <CRON_SECRET>" header when it invokes a
// scheduled function, IF the CRON_SECRET env var is set on the project —
// nothing else to configure for this on Vercel's side. This endpoint
// refuses any request that doesn't carry that exact header, since unlike
// api/data.js's resource router (which requires the admin password),
// this path would otherwise be a public, unauthenticated URL that could
// trigger a real Portal pull for anyone who found it.
//
// Env vars needed (Vercel -> Project -> Settings -> Environment Variables),
// in addition to the ones api/data.js already needs:
//   CRON_SECRET — any random string you generate yourself (e.g. a UUID).
//                 Vercel automatically sends it back as the Authorization
//                 header on every cron invocation once it's set — you
//                 don't wire that up anywhere else.

const { handlePortalSyncFetch, getConnection } = require('./data.js');

function normalizeCompanyKey(company) {
  return (company || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}
function normalizeCandidateKey(name) {
  return (name || '').trim().toLowerCase();
}
// Mirrors index.html's isAdvancedRound() exactly — anything that doesn't
// start with "1" (optionally "1st") counts as advanced, deliberately loose
// about typos in the ordinal suffix for the same reason the client-side
// version is.
function isAdvancedRound(round) {
  const r = (round || '').trim();
  if (!r) return false;
  return !/^1(st)?\b/i.test(r);
}
// A deliberately narrower server-side version of index.html's
// assigneeToPortalTeamCode() — covers the two named teams plus roster
// lookups, but skips that function's last-resort "infer from Portal data
// alone" fallback for a name not in the roster at all. This runs
// unattended every night with no one to catch a bad guess, so staying
// conservative (skip rather than guess) is the right tradeoff here even
// though it means a handful of edge cases won't auto-fill and will need
// the in-app button (which DOES have that fallback) or a manual fill
// instead.
function assigneeToTeamCode(assignee, rosterByName) {
  if (!assignee) return null;
  const label = assignee.trim().toLowerCase();
  if (label === 'hyd team') return 'HYD';
  if (label === 'pradeep anna team') return 'PRADEEP';
  if (label.startsWith('development')) return 'DEV';
  const person = rosterByName.get(label);
  if (person && person.team) return assigneeToTeamCode(person.team, rosterByName);
  return null;
}
// Server-side port of findPortalMatchForRow() (index.html) — same
// same-date-then-time-then-company tie-breaking, working off a pre-built
// index (candidateKey|teamCode -> portal records) rather than scanning
// the whole portalAssignments array per call, since this runs across
// potentially thousands of calls at once instead of one row at a time.
function findPortalMatchForCall(call, teamCode, portalIndex) {
  const key = normalizeCandidateKey(call.candidate) + '|' + teamCode;
  let matches = portalIndex.get(key);
  if (!matches || !matches.length) return null;
  const dateMatches = matches.filter(p => p.dateKey && p.dateKey === call.call_date);
  if (dateMatches.length) matches = dateMatches;
  else matches = matches.filter(p => !p.dateKey);
  if (!matches.length) return null;
  if (matches.length === 1) return matches[0];
  const timeMatches = matches.filter(p => p.time === call.time_text);
  if (timeMatches.length) matches = timeMatches;
  if (matches.length > 1) {
    const companyKey = normalizeCompanyKey(call.company);
    const companyMatches = matches.filter(p => normalizeCompanyKey(p.client) === companyKey);
    if (companyMatches.length) matches = companyMatches;
  }
  return matches[0];
}
// The backfill itself. `portalAssignments` is the exact array the sync
// step above just fetched fresh (not read back from the cache — the
// freshest data available this run). Returns a summary object; never
// throws past its own boundary — a backfill failure should never turn a
// successful Portal sync into a failed cron run, so callers get
// {ok:false, error} back instead of an exception to handle themselves.
async function backfillDrivingPersonFromPortal(portalAssignments) {
  if (!Array.isArray(portalAssignments) || !portalAssignments.length) {
    return { ok: true, appliedCount: 0, dateCount: 0, skippedReason: 'no Portal data returned by this sync' };
  }
  const db = await getConnection();
  try {
    const [rosterRows] = await db.query('SELECT name, team FROM roster');
    const rosterByName = new Map(rosterRows.map(r => [String(r.name || '').trim().toLowerCase(), r]));

    // Every non-WOI call across every date that has no Driving Person
    // saved yet — the exact same starting set the in-app backfill button
    // scans, just fetched directly from the database instead of the
    // frontend's cross-date fetch.
    const [calls] = await db.query(
      `SELECT c.id, c.call_date, c.candidate, c.company, c.round_text, c.assignee, c.time_text
       FROM calls c
       LEFT JOIN call_driving_person cdp ON cdp.call_id = c.id
       WHERE c.is_woi = 0
         AND c.candidate IS NOT NULL AND c.candidate <> ''
         AND (cdp.driving_person IS NULL OR cdp.driving_person = '')`
    );

    // Index the Portal data by candidateKey|teamCode so each call is a
    // single Map lookup rather than a scan of the whole assignments array.
    const portalIndex = new Map();
    portalAssignments.forEach(p => {
      if (!p || !p.candidate || !p.teamCode) return;
      const key = normalizeCandidateKey(p.candidate) + '|' + p.teamCode;
      if (!portalIndex.has(key)) portalIndex.set(key, []);
      portalIndex.get(key).push(p);
    });

    const updates = []; // [callId, callDate, drivingPerson]
    const datesTouched = new Set();
    calls.forEach(call => {
      // call_date comes back from mysql2 as a Date object by default —
      // normalize to the same yyyy-MM-dd string shape Portal's dateKey uses.
      const callDateStr = call.call_date instanceof Date
        ? call.call_date.toISOString().slice(0, 10)
        : String(call.call_date).slice(0, 10);
      if (isAdvancedRound(call.round_text)) return; // advanced rounds: never auto-applied, same rule as everywhere else
      const teamCode = assigneeToTeamCode(call.assignee, rosterByName);
      if (!teamCode) return;
      const match = findPortalMatchForCall({ ...call, call_date: callDateStr }, teamCode, portalIndex);
      if (!match) return;
      const handler = match.handler || match.assignee;
      if (!handler) return;
      updates.push([call.id, callDateStr, handler]);
      datesTouched.add(callDateStr);
    });

    if (updates.length) {
      await db.query(
        `INSERT INTO call_driving_person (call_id, call_date, driving_person) VALUES ?
         ON DUPLICATE KEY UPDATE driving_person = VALUES(driving_person), call_date = VALUES(call_date)`,
        [updates]
      );
    }
    return { ok: true, appliedCount: updates.length, dateCount: datesTouched.size };
  } catch (e) {
    console.error('Nightly Driving Person backfill failed:', e);
    return { ok: false, error: e && e.message ? e.message : String(e) };
  } finally {
    await db.end();
  }
}

module.exports = async (req, res) => {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    console.error('CRON_SECRET is not set — refusing to run an unauthenticated Portal sync.');
    return res.status(500).json({ error: 'CRON_SECRET is not configured for this project.' });
  }
  const auth = req.headers['authorization'] || '';
  if (auth !== `Bearer ${expected}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // A Full assignments sync (no date) — the same thing clicking "🗂 Full
  // Sync" in the app's Team Sync panel does. Pulls the entire call
  // history and, per the per-date cache fan-out already built into
  // handlePortalSyncFetch, writes an independent fresh snapshot for every
  // date it covers — not just one shared blob — so this one nightly run
  // keeps every date's Portal data current, not only today's.
  //
  // Captured via a fake `res` instead of handing the real one straight
  // through (as this file did before 2026-09-29), so the backfill step
  // below can run against the SAME fresh data this sync just fetched,
  // rather than needing a second read-from-cache round trip. The real
  // `res` is only used once, at the very end, with a combined summary.
  const fakeReq = { method: 'GET', query: { type: 'assignments' } };
  let syncResult = null;
  const fakeRes = {
    _code: 200,
    status(code) { this._code = code; return this; },
    json(body) { syncResult = { code: this._code, body }; return this; },
  };
  await handlePortalSyncFetch(fakeReq, fakeRes);

  if (!syncResult || !syncResult.body || syncResult.body.ok !== true) {
    // Sync itself failed — report that as before, don't attempt a backfill
    // against data that was never actually fetched.
    return res.status(syncResult ? syncResult.code : 502).json(syncResult ? syncResult.body : { error: 'Portal sync failed with no response.' });
  }

  const backfill = await backfillDrivingPersonFromPortal(syncResult.body.data);
  return res.status(200).json({
    ...syncResult.body,
    drivingPersonBackfill: backfill,
  });
};
