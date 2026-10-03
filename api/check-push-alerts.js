// api/check-push-alerts.js
// A separate, isolated serverless function — same "keep it isolated"
// reasoning api/auth.js and api/cron-portal-sync.js already use — meant to
// be hit every few minutes by an EXTERNAL scheduler (not Vercel's own Cron
// Jobs: the Hobby plan only guarantees cron jobs run once a day, which is
// useless for a "within 15 minutes of start time" check). A free service
// like cron-job.org or a GitHub Actions scheduled workflow hitting this
// URL every 5 minutes is what actually makes alerts fire with the app
// closed — see the README note in this same delivery for exact setup
// steps.
//
// This is the real background-push follow-on flagged throughout
// architecture-and-status.md: the in-app "🔔 Alerts" toggle (added
// 2026-09-30) only ever fired while the tab/PWA was open and its own
// setInterval could run. This endpoint does the identical check
// (unassigned, non-WOI, no status call within ALERT_WINDOW_BEFORE_MIN
// minutes of start / up to ALERT_WINDOW_AFTER_MIN minutes late — same
// constants as index.html's checkTimeSensitiveAlerts, kept in sync by
// comment) server-side, and sends a real Web Push notification to every
// subscribed device via the `web-push` library, so it reaches you even
// with the app fully closed.
//
// Security: requires a shared secret, since unlike api/cron-portal-
// sync.js (triggered only by Vercel's own infrastructure, which sends the
// Authorization header automatically) this URL has to be reachable by a
// third-party scheduler that may only support a plain GET with no custom
// headers — so the secret is accepted EITHER as a `?secret=` query param
// OR as "Authorization: Bearer <secret>", whichever your chosen scheduler
// can actually send. Pick one and use it consistently.
//
// Env vars needed (Vercel -> Project -> Settings -> Environment Variables),
// in addition to the ones api/data.js already needs:
//   PUSH_ALERT_SECRET — any random string you generate yourself. Deliberately
//                       a SEPARATE secret from CRON_SECRET, since this URL
//                       is exposed to a third-party scheduler you don't
//                       control, while CRON_SECRET is only ever seen by
//                       Vercel's own cron system.
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT — the Web Push
//                       identity for this app. See the delivery notes for
//                       a real generated key pair and exact values.
//
// Also needs the `web-push` npm package added to package.json — this
// session's sandbox has no network access to npm's registry to install
// it directly, so: run `npm install web-push` in your repo locally (or
// edit package.json's dependencies by hand to add "web-push": "^3.6.7"
// and let Vercel install it on deploy).

const { getConnection } = require('./data.js');

const ALERT_WINDOW_BEFORE_MIN = 15; // mirrors index.html's ALERT_WINDOW_BEFORE_MIN
const ALERT_WINDOW_AFTER_MIN = 10;  // mirrors index.html's ALERT_WINDOW_AFTER_MIN

// Mirrors index.html's timeToMinutes() closely enough to agree on the same
// calls — handles "2:30 PM", "2.30pm", "12 AM", etc. Falls back to 9999
// (never matches the alert window) for anything unparseable, same as the
// client-side version.
function timeToMinutes(t) {
  if (!t) return 9999;
  let m = t.match(/(\d{1,2})(?:[:.](\d{2}))?\s*([AaPp][Mm])/);
  if (m) {
    let h = parseInt(m[1], 10) % 12;
    if (/PM/i.test(m[3])) h += 12;
    const min = m[2] ? parseInt(m[2], 10) : 0;
    return h * 60 + min;
  }
  return 9999;
}

module.exports = async (req, res) => {
  const expected = process.env.PUSH_ALERT_SECRET;
  if (!expected) {
    console.error('PUSH_ALERT_SECRET is not set — refusing to run unauthenticated.');
    return res.status(500).json({ error: 'PUSH_ALERT_SECRET is not configured for this project.' });
  }
  const headerAuth = req.headers['authorization'] || '';
  const querySecret = req.query && req.query.secret;
  const authorized = headerAuth === `Bearer ${expected}` || querySecret === expected;
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let webpush;
  try {
    webpush = require('web-push');
  } catch (e) {
    console.error('web-push is not installed — add it to package.json and redeploy.', e);
    return res.status(500).json({ error: '"web-push" package is not installed on this deployment yet.' });
  }

  const vapidPublic = process.env.VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';
  if (!vapidPublic || !vapidPrivate) {
    console.error('VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY are not set.');
    return res.status(500).json({ error: 'VAPID keys are not configured for this project.' });
  }
  webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

  const db = await getConnection();
  try {
    // "Today" in the same timezone every other part of this app reasons
    // about dates in (Asia/Kolkata), not the server's own UTC day — a
    // check running at, say, 6:30 AM UTC is already well into "today" IST.
    const todayIST = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date()); // en-CA gives "YYYY-MM-DD"
    const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const nowMin = nowIST.getHours() * 60 + nowIST.getMinutes();

    let rows;
    try {
      [rows] = await db.query(
        `SELECT c.id, c.time_text, c.candidate, c.company, c.assignee, c.is_woi,
                cs.status AS cs_status, cdp.driving_person AS cdp_driving_person
         FROM calls c
         LEFT JOIN call_status cs ON cs.call_id = c.id
         LEFT JOIN call_driving_person cdp ON cdp.call_id = c.id
         WHERE c.call_date = ?`,
        [todayIST]
      );
    } catch (e) {
      // One or both join tables may not exist yet — same graceful fallback
      // handleCalls' GET already uses.
      [rows] = await db.query('SELECT id, time_text, candidate, company, assignee, is_woi FROM calls WHERE call_date = ?', [todayIST]);
    }

    const due = rows.filter(r => {
      if (r.is_woi) return false;
      if ((r.assignee || '').trim()) return false;
      if ((r.cdp_driving_person || '').trim()) return false;
      if (r.cs_status) return false;
      const callMin = timeToMinutes(r.time_text);
      if (callMin === 9999) return false;
      const diff = callMin - nowMin;
      return diff <= ALERT_WINDOW_BEFORE_MIN && diff >= -ALERT_WINDOW_AFTER_MIN;
    });

    if (!due.length) {
      return res.status(200).json({ ok: true, checked: rows.length, due: 0, alertsSent: 0 });
    }

    // Skip any call already alerted today — the unique (call_id, call_date)
    // key on push_alert_log means a genuinely successful earlier send for
    // the same call this same day is never repeated on the next check a
    // few minutes later.
    const [alreadyLogged] = await db.query(
      'SELECT call_id FROM push_alert_log WHERE call_date = ? AND call_id IN (?)',
      [todayIST, due.map(r => r.id)]
    );
    const alreadyAlertedIds = new Set(alreadyLogged.map(r => r.call_id));
    const toAlert = due.filter(r => !alreadyAlertedIds.has(r.id));

    if (!toAlert.length) {
      return res.status(200).json({ ok: true, checked: rows.length, due: due.length, newlyAlerted: 0, alertsSent: 0, note: 'All due calls were already alerted earlier.' });
    }

    const [subs] = await db.query('SELECT id, endpoint, p256dh, auth_key FROM push_subscriptions');
    if (!subs.length) {
      // Nothing to send to — deliberately do NOT log these as alerted, so
      // a call stays eligible and gets a real push the moment someone
      // actually subscribes, rather than silently expiring unseen.
      return res.status(200).json({ ok: true, checked: rows.length, due: due.length, newlyAlerted: toAlert.length, alertsSent: 0, note: 'No subscribed devices yet.' });
    }

    let sentCount = 0;
    const deadEndpointIds = [];
    for (const call of toAlert) {
      const payload = JSON.stringify({
        title: 'Unassigned call coming up',
        body: `${call.candidate || '(no name)'}${call.company ? ' — ' + call.company : ''} at ${call.time_text || '?'} still has no one assigned.`,
        tag: 'cd-alert-' + call.id,
      });
      let sentToAnySub = false;
      for (const sub of subs) {
        const pushSubscription = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } };
        try {
          await webpush.sendNotification(pushSubscription, payload);
          sentCount++;
          sentToAnySub = true;
        } catch (err) {
          // 404/410 means the browser/OS has permanently invalidated this
          // subscription (uninstalled, unsubscribed at the OS level, etc.)
          // — safe and correct to prune it rather than retrying forever.
          if (err && (err.statusCode === 404 || err.statusCode === 410)) {
            deadEndpointIds.push(sub.id);
          } else {
            console.error('Push send failed for subscription', sub.id, err && err.message);
          }
        }
      }
      if (sentToAnySub) {
        await db.query(
          'INSERT INTO push_alert_log (call_id, call_date) VALUES (?, ?) ON DUPLICATE KEY UPDATE alerted_at = NOW()',
          [call.id, todayIST]
        );
      }
    }

    if (deadEndpointIds.length) {
      await db.query('DELETE FROM push_subscriptions WHERE id IN (?)', [deadEndpointIds]);
    }

    return res.status(200).json({
      ok: true,
      checked: rows.length,
      due: due.length,
      newlyAlerted: toAlert.length,
      alertsSent: sentCount,
      subscriptionsPruned: deadEndpointIds.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong checking/sending push alerts. Check the Vercel function logs.' });
  } finally {
    try { await db.end(); } catch (e) { /* already closed or never opened */ }
  }
};
