// api/cron-portal-sync.js
// A separate, isolated serverless function — deliberately NOT part of
// api/data.js's ?resource= router, same "keep it isolated" reasoning
// api/auth.js already uses for login — triggered nightly by Vercel's own
// Cron Jobs (see vercel.json's "crons" entry), never by the browser or by
// any Coverage Desk session itself.
//
// Its only job: call the exact same Portal "Full Sync" logic the in-app
// button already uses (handlePortalSyncFetch, reused directly from
// api/data.js rather than a second, drift-prone copy of the same logic)
// so fresh Portal data is already sitting in portal_sync_cache before
// anyone opens the app the next day — no more "Portal has a record, but
// only for an older date" warnings for data Portal already had current,
// just because nobody happened to click Sync the evening before.
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

const { handlePortalSyncFetch } = require('./data.js');

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
  const fakeReq = { method: 'GET', query: { type: 'assignments' } };
  return handlePortalSyncFetch(fakeReq, res);
};
