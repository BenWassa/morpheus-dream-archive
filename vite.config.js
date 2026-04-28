import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/morpheus-dream-archive/',
      manifestFilename: 'manifest.webmanifest',
      manifest: false,
      includeAssets: ['icons/*.png', 'icons/favicon.ico'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: '/morpheus-dream-archive/index.html',
        ignoreURLParametersMatching: [/^v$/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\/index\.json(\?.*)?$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'morpheus-index',
              networkTimeoutSeconds: 3,
            },
          },
          {
            urlPattern: /\/entries\/.*\.json(\?.*)?$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'morpheus-entries' },
          },
          {
            urlPattern: /\/images\/.*\.(?:jpg|jpeg|png|webp|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'morpheus-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'gfonts' },
          },
        ],
      },
    }),
  ],
  base: '/morpheus-dream-archive/',
  build: {
    outDir: 'docs',
  },
});
