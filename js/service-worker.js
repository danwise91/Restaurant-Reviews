
//register the service worker 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('js/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

//cache all the files
var cacheName = 'restaurant-reviews-cache-v1';
	var urlsToCache = [
		'/',
		'../css/styles.css',
		'../data/restaurants.json',
		'../img/1.jpg',
		'../img/10.jpg',
		'../img/2.jpg',
		'../img/3.jpg',
		'../img/4.jpg',
		'../img/5.jpg',
		'../img/6.jpg',
		'../img/7.jpg',
		'../img/8.jpg',
		'../img/9.jpg',
		'../js/main.js',
		'../js/restaurant_info.js',
		'../js/dbhelper.js',
		'../index.html',
		'../restaurant.html'
	];

//install the service worker and confirm if assets
//are cached or not
self.addEventListener('install', function(event){
	//perform install steps
	event.waitUntil(
		caches.open(cacheName)
		.then(function(cache){
			console.log("Cache opened");
			return cache.addAll(urlsToCache);
		})
	);
});

//cache and return requests using fetch
self.addEventListener('fetch', function(event){
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

//update service worker 
self.addEventListener('activate', function(event){
	var newCacheList = ['restaurant-cache-v1', 'reviews-cache-v1'];

	event.waitUntil(
		caches.keys().then(function(cacheNames){
		return Promise.all(
			cacheNames.map(function(cacheName){
			if (newCacheList.indexOf(cacheName) === -1){
				return caches.delete(cacheName);
				  }
			   })
			);
		})
	);
});
