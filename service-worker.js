//cache all the files
var cacheName = 'restaurant-reviews-cache-v3';
	var urlsToCache = [
		'/',
		'/css/styles.css',
		'/data/restaurants.json',
		'/img/1.jpg',
		'/img/10.jpg',
		'/img/2.jpg',
		'/img/3.jpg',
		'/img/4.jpg',
		'/img/5.jpg',
		'/img/6.jpg',
		'/img/7.jpg',
		'/img/8.jpg',
		'/img/9.jpg',
		'/js/main.js',
		'/js/restaurant_info.js',
		'/js/dbhelper.js',
		'index.html',
		'app.js',
		'restaurant.html'
	];

//install the service worker and confirm if assets
//are cached or not
self.addEventListener('install', function(event){
	console.log('service worker install');
	//perform install steps
	event.waitUntil(
		caches.open(cacheName)
		.then(function(cache){
			console.log("Cache opened");
			return cache.addAll(urlsToCache);
		})
	);
});


//update service worker 
self.addEventListener('activate', function(e) {
  console.log('service worker activated');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

//cache and return requests using fetch
self.addEventListener('fetch', function(event){
	console.log('service worker fetch', event.request.url);
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			//cache hit then return the response
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});
