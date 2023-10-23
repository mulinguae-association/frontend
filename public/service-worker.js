// /* eslint-disable no-undef */
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');


// workbox.routing.registerRoute(
//   /\.(?:js|jsx)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'scripts',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 20,
//         maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
//       }),
//     ],
//   })
// );
// workbox.routing.registerRoute(
//   /\.(?:css)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'stylesheets',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 20,
//         maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
//       }),
//     ],
//   })
// );
// workbox.routing.registerRoute(
//   /\.(?:png|jpg|jpeg|svg)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
//       }),
//     ],
//   })
// );