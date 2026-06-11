const CACHE_NAME = "instagram-clone-v3";
// Only cache static, content-hashed assets — never HTML pages.
const urlsToCache = ["/manifest.json", "/icons/instagram.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const isNavigation =
    event.request.mode === "navigate" ||
    event.request.destination === "document";

  // Network-first for pages and scripts/styles so a new deploy never gets
  // shadowed by stale cached HTML pointing at dead JS chunks (the bug that
  // left the UI unclickable: no hydration = no onClick).
  if (
    isNavigation ||
    event.request.destination === "script" ||
    event.request.destination === "style"
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request)),
    );
    return;
  }

  // Cache-first only for immutable static assets (images, icons, fonts).
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.map((name) => (name !== CACHE_NAME ? caches.delete(name) : null)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
