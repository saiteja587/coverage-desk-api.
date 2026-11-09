// Coverage Desk service worker.
// Network-first for the app shell (index.html, scripts, styles, manifest, icons) — a new
// deployment always reaches every device immediately rather than getting
// stuck behind a stale cached copy. The cache only kicks in as an OFFLINE
// fallback, never as the primary source.
//
// Also handles background Web Push (alerts that arrive with the app closed) and
// taps on notifications (opens / focuses the app on the right call).
//
// Bump CACHE whenever you want to force every device to drop old cached
// files (rare — the network-first strategy already means this normally
// isn't needed).
const CACHE = 'coverage-desk-v10';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './ui.js',
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  // Each file is cached on its own so one missing file can't stop the rest.
  e.waitUntil(
    caches.open(CACHE).then((cache) => Promise.all(APP_SHELL.map((u) => cache.add(u).catch(() => {})))).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Never cache live data — calls, roster, notes, incentives, everything
  // under /api/ must always come straight from the network.
  if (e.request.url.includes('/api/')) return;

  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, copy));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});

// ---------- Push notifications (app closed or in the background) ----------
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (err) { data = { title: 'Coverage Desk', body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'Coverage Desk';
  const options = {
    body: data.body || '',
    tag: data.tag || 'cd-alert',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [120, 60, 120],
    renotify: true,
    timestamp: Date.now(),
    data: data.data || {},
  };
  const acts = data.actions || cdActionsFor(options.data);
  if(acts && acts.length) options.actions = acts;
  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping a notification: focus the open app and tell it which call to show. The page acknowledges
// the message; if it does not (frozen / still loading / old page), reload the app straight onto that call.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const d = event.notification.data || {};
  if(event.action && event.action.indexOf('st:') === 0){ event.waitUntil(cdStatusFromNotification(d, event.action.slice(3))); return; }
  const q = d.kind === 'gdoc' ? '?cd_open=gdoc' : (d.date || d.candidate) ? '?cd_date=' + encodeURIComponent(d.date || '') + '&cd_cand=' + encodeURIComponent(d.candidate || '') : '';
  event.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const client = list.find((c) => 'focus' in c) || null;
    if(client){
      try{ await client.focus(); }catch(e){}
      const acked = await new Promise((resolve) => {
        try{
          const ch = new MessageChannel();
          const t = setTimeout(() => resolve(false), 1800);
          ch.port1.onmessage = () => { clearTimeout(t); resolve(true); };
          client.postMessage(Object.assign({ type: 'cd-open' }, d), [ch.port2]);
        }catch(e){ resolve(false); }
      });
      if(acked) return;
      try{ if(q && 'navigate' in client){ await client.navigate('./' + q); return; } }catch(e){}
      return;
    }
    if(self.clients.openWindow) return self.clients.openWindow('./' + q);
  })());
});


// ---------- One-tap status straight from a notification ----------
// A notification about a call gets Confirmed / No-show / Rescheduled buttons. Tapping one updates the
// call right here in the background (same endpoints the app itself uses) — the app does not have to open.
// The page leaves its sign-in details in IndexedDB (see ui.js, layer d34) so this worker can make the call.
const CD_ACTIONS = [
  { action: 'st:confirmed', title: '\u2705 Confirmed' },
  { action: 'st:not_responded', title: '\u260E No-show' },
  { action: 'st:rescheduled', title: '\uD83D\uDD01 Rescheduled' },
];
function cdActionsFor(d){
  return (d && d.date && (d.id || d.candidate) && d.kind !== 'gdoc') ? CD_ACTIONS : [];
}
function cdIdb(){
  return new Promise((resolve, reject) => {
    const r = indexedDB.open('cd-sw', 1);
    r.onupgradeneeded = () => { r.result.createObjectStore('kv'); };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
async function cdGetAuth(){
  try{
    const db = await cdIdb();
    return await new Promise((resolve) => {
      const q = db.transaction('kv').objectStore('kv').get('auth');
      q.onsuccess = () => resolve(q.result || null);
      q.onerror = () => resolve(null);
    });
  }catch(e){ return null; }
}
const cdNorm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
async function cdApi(auth, resource, date, body){
  const headers = { 'Content-Type': 'application/json' };
  if(auth.pw){ headers['x-admin-password'] = auth.pw; headers['x-password'] = auth.pw; }
  if(auth.user) headers['x-username'] = auth.user;
  const url = String(auth.base || '').replace(/\/$/, '') + '/api/data?resource=' + resource + '&date=' + encodeURIComponent(date);
  const resp = await fetch(url, body ? { method: 'POST', headers, body: JSON.stringify(body) } : { headers });
  if(!resp.ok) throw new Error(resource + ' ' + resp.status);
  return resp.json();
}
// Returns { ok, text }. Never throws.
async function cdApplyStatus(d, kind, auth){
  try{
    if(!auth || !auth.base) return { ok: false, text: 'Open the app once while signed in, then try again.' };
    const date = d.date;
    // find the call id (the push carries it; a reminder may only know the candidate name)
    let id = d.id, name = d.candidate || '';
    if(!id || !name){
      const calls = await cdApi(auth, 'calls', date);
      const rows = calls.rows || [];
      let hit = id ? rows.find((r) => String(r.id) === String(id)) : null;
      if(!hit && name){ const k = cdNorm(name); const m = rows.filter((r) => cdNorm(r.candidate) === k && !r.woi); hit = m.length === 1 ? m[0] : (m.find((r) => !r.status) || null); }
      if(!hit) return { ok: false, text: 'Could not find that call on ' + date + '.' };
      id = hit.id; name = hit.candidate || name;
    }
    if(kind === 'confirmed'){
      const nd = await cdApi(auth, 'notes', date);
      const rows = nd.rows || [];
      const nid = date + '-confirm-ids';
      let e = rows.find((n) => n && n.id === nid), m = {};
      try{ m = e ? (JSON.parse(e.text) || {}) : {}; }catch(x){ m = {}; }
      m[id] = 'confirmed';
      if(e) e.text = JSON.stringify(m); else rows.push({ id: nid, text: JSON.stringify(m) });
      await cdApi(auth, 'notes', date, { date, rows });
      return { ok: true, text: name + ' marked as confirmed.' };
    }
    const sd = await cdApi(auth, 'call_status', date);
    const list = (sd.rows || []).filter((r) => String(r.callId) !== String(id));
    const reason = 'Marked from the notification';
    list.push({ callId: id, status: kind, reason, statusFields: [{ label: 'Reason', value: reason }] });
    await cdApi(auth, 'call_status', date, { date, rows: list });
    return { ok: true, text: name + ' marked as ' + (kind === 'not_responded' ? 'no-show' : 'rescheduled') + '.' };
  }catch(e){
    return { ok: false, text: 'Could not update (' + (e && e.message ? e.message : 'network') + '). Tap the alert to open the app.' };
  }
}
async function cdStatusFromNotification(d, kind){
  const res = await cdApplyStatus(d, kind, await cdGetAuth());
  try{
    await self.registration.showNotification(res.ok ? '\u2713 Done' : 'Not updated', {
      body: res.text, tag: 'cd-status-result', icon: 'icon-192.png', badge: 'icon-192.png', data: res.ok ? {} : d,
    });
    if(res.ok) setTimeout(async () => { try{ (await self.registration.getNotifications({ tag: 'cd-status-result' })).forEach((n) => n.close()); }catch(e){} }, 6000);
  }catch(e){}
  if(res.ok){
    try{ (await self.clients.matchAll({ type: 'window', includeUncontrolled: true })).forEach((c) => c.postMessage({ type: 'cd-refresh', date: d.date })); }catch(e){}
  }
}
