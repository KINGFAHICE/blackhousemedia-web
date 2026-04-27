const CACHE_NAME = 'v1_SITE_CACHE'; // Increment this (e.g., 'v2_SITE_CACHE') to trigger updates
const RESOURCES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/resoursesIcons/icon-192x192.png',
    '/resoursesIcons/icon-512x512.png',
];

// INSTALL: Pre-cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(RESOURCES_TO_CACHE);
        })
    );
});

// ACTIVATE: Clean up old versions of the cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// MESSAGE: Listen for the "skip waiting" command from the frontend
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// FETCH: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});