var CACHE = 'cache-only';

self.addEventListener('install', function (evt) {
    function precache() {
        return caches.open(CACHE).then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                'assets/photo2018.jpg',
                'assets/qr.png',
                'assets/icons-128.png',
                'assets/icons-512.png',
                'node_modules/jquery/dist/jquery.slim.min.js',
                'node_modules/popper.js/dist/popper.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                'favicon.ico',
                'manifest.json'
            ]);
        });
    }

    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function (evt) {
    function fromCache(request) {
        return caches.open(CACHE).then(function (cache) {
            return cache.match(request).then(function (matching) {
                if(matching) {
                    return matching;
                }
    
                // set breakpoint here to break on error...
                return Promise.reject('no-match');
            });
        });
    }

    console.log('[service-worker]: fromCache ' + evt.request.url);
    evt.respondWith(fromCache(evt.request));
});