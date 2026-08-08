const CACHE_NAME = 'notedesk-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'notes.html',
  'about.html',
  'contact.html',
  'note.html',
  'changelog.html',
  'style.css',
  'script.js',
  'ticker.js',
  'notes.json',
  'img/favicon.png',
  'img/tech-pattern.jpg'
];

// Install Event - Caching Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Cache-First Strategy with Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Cache dynamically fetched files if valid
          if (event.request.method === 'GET' && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback for offline navigation if needed
        if (event.request.mode === 'navigate') {
          return caches.match('notes.html');
        }
      });
    })
  );
});