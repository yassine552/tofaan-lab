/* مِرصاد · Service Worker — يعمل دون اتصال بعد الزيارة الأولى */
const CACHE = 'mirsad-v1';
const CORE = [
  './',
  './index.html',
  './assets/favicon.svg',
  './assets/manifest.webmanifest',
  './robots.txt'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache cross-origin (e.g., Google Fonts CDN) — always go to network
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Cache-first for local assets, fall back to network, then cache new copy
  e.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
