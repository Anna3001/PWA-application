const staticDevCoffee = "dev-movie-site-v1"
const assets = [
  "/",
  "./index.html",
  "./css/style.css",
  "./viewModels/generalViewModel.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      console.log(cache);
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
