// Coverage Desk service worker.
// Network-first for the app shell (index.html, manifest, icons) — a new
// deployment always reaches every device immediately rather than getting
// stuck behind a stale cached copy. The cache only kicks in as an OFFLINE
// fallback, never as the primary source.
//
// Bump CACHE whenever you want to force every device to drop old cached
// files (rare — the network-first strategy already means this normally
// isn't needed).
const CACHE = 'coverage-desk-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
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
  // under /api/ must always come straight from the network. Serving a
  // cached API response would show stale coverage data, which is exactly
  // what the backend's own Cache-Control: no-store headers are already
  // trying to prevent.
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
