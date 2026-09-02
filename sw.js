// Pause service worker: an offline shell for a tool people reach for mid-craving.
// Navigations are network-first so edits still reach everyone, with a cache
// fallback so the app always opens, even with no connection.
const VERSION = 'pause-2026-09-02';
const CORE = [
  '/', '/site.webmanifest',
  '/icon-192.v2.png', '/icon-512.v2.png', '/icon-512-maskable.v2.png',
  '/favicon.ico', '/apple-touch-icon.png', '/og-image.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // App shell / navigations: network-first, fall back to the cached app.
  if (req.mode === 'navigate' || url.pathname === '/' || url.pathname === '/index.html') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('/', copy)); return res; })
        .catch(() => caches.match('/', { ignoreSearch: true }).then((r) => r || caches.match(req)))
    );
    return;
  }

  // Static assets: cache-first, refresh in the background.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
