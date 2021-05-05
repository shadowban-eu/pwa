/* eslint-disable no-restricted-globals */
self.addEventListener('fetch', (event) => {
  // ignore non-http schemes (e.g. extensions)
  if (!event.request.url.startsWith('http')) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.open('shadowban-eu').then((cache) =>
      cache.match(event.request).then(
        (response) =>
          response ||
          fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
      )
    )
  );
});
