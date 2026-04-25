const CACHE_NAME ='v1_SITE_CACHE';
const RESOURCES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/resoursesIcons/icon-192x192.png',
    '/resoursesIcons/icon-512x512.png',
];
//INSTALL THE SERVICE WORKER
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(RESOURCES_TO_CACHE);
            })
    );
});
//Serve cache content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});