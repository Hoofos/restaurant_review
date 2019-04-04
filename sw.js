let staticCacheName = 'restaurant-review-cache';

/**
 * What to cache.
 */
let urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

/**
 * Event Listener - Install
 */
self.addEventListener('install', function(event) {
  console.log('ServiceWorker Installed');

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('ServiceWorker Caching');
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Event Listener - Activate
 */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      ).then(function() {
        console.log('ServiceWorker Activated');
      });
    })
  );
});

/**
 * Event Listener - Fetch
 */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function(err) {
      console.log('Error: ' + err);
    })
  );
});

/**
 * Event Listener - Message
 */
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
