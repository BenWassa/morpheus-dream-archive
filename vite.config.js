import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/',
      manifestFilename: 'manifest.webmanifest',
      manifest: false,
      includeAssets: ['icons/*.png', 'icons/favicon.ico'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        navigateFallback: '/index.html',
        ignoreURLParametersMatching: [/^v$/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'gfonts' },
          },
        ],
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'docs',
  },
});
