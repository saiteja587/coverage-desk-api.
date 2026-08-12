const CACHE = 'coverage-desk-v1';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

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
  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(e.request).then((cached) => {
        const network = fetch(e.request)
          .then((resp) => {
            cache.put(e.request, resp.clone());
            return resp;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
