const CACHE_NAME = 'reader-cache-v1';
const urlsToCache = [
    '/', // Главная
    '/download', // Страница ридера
    '/favicon.ico',
    '/manifest.json',
    '/icons/icon-192x192.png', // иконки, если используешь PWA
    // можешь добавить ещё пути
];

// Установка SW и кэш
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Запросы из кэша или сети
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return (
                response ||
                fetch(event.request).catch(() => {
                    // fallback page here if needed
                })
            );
        })
    );
});
