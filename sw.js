const CACHE_NAME = 'v4_SITE_CACHE';

const RESOURCES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/resoursesIcons/icon-192x192.png',
    '/resoursesIcons/icon-512x512.png',
];

// INSTALL
self.addEventListener('install', (event) => {

    // Activate immediately
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(RESOURCES_TO_CACHE);
        })
    );
});

// ACTIVATE
self.addEventListener('activate', (event) => {

    event.waitUntil(

        Promise.all([

            // Delete old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) {
                            console.log('Deleting old cache:', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            }),

            // Take control immediately
            clients.claim()

        ])
    );
});

// MESSAGE
self.addEventListener('message', (event) => {

    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }

});

// FETCH
self.addEventListener('fetch', (event) => {

    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(

        fetch(event.request)

            .then((networkResponse) => {

                // Update cache with latest version
                return caches.open(CACHE_NAME).then((cache) => {

                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });

            })

            .catch(() => {

                // Offline fallback
                return caches.match(event.request);

            })
    );
});