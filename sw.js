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
const CACHE = 'coverage-desk-v5';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './ui.js',
  './style.css',
  './ui.css',
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
  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping a notification: focus the open app and tell it which call to show. The page acknowledges
// the message; if it does not (frozen / still loading / old page), reload the app straight onto that call.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const d = event.notification.data || {};
  const q = (d.date || d.candidate) ? '?cd_date=' + encodeURIComponent(d.date || '') + '&cd_cand=' + encodeURIComponent(d.candidate || '') : '';
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
