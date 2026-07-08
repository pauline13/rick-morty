import path from 'path';

import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

import { DEFAULT_REMOTE_FAVORITES_URL } from './federation.config';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  const base = process.env.VITE_BASE_PATH || '/';
  const remoteFavoritesUrl =
    process.env.VITE_REMOTE_FAVORITES_URL ?? DEFAULT_REMOTE_FAVORITES_URL;

  return {
    base,
    plugins: [
      react(),
      svgr(),
      federation({
        name: 'host_app',
        remotes: {
          remote_app: remoteFavoritesUrl
        },
        shared: ['react', 'react-dom']
      }),
      ViteImageOptimizer(),
      VitePWA({
        base,
        registerType: 'autoUpdate',
        includeManifestIcons: false,
        workbox: {
          globPatterns: ['**/*.{html,css,js,svg,png,ico,webp}'],
          navigateFallback: `${base}index.html`,
          runtimeCaching: [
            {
              urlPattern:
                /^https:\/\/rickandmortyapi\.com\/api\/character\/avatar\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'rm-avatars',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              urlPattern: /^https:\/\/rickandmortyapi\.com\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'rm-api',
                networkTimeoutSeconds: 10,
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            }
          ]
        },
        manifest: {
          name: 'Rick & Morty',
          short_name: 'R&M',
          description: 'Каталог персонажей вселенной Рика и Морти',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait',
          lang: 'ru-RU',
          screenshots: [
            {
              src: '/screenshots/desktop.png',
              type: 'image/png',
              sizes: '2107x1327',
              form_factor: 'wide'
            },
            {
              src: '/screenshots/mobile.png',
              type: 'image/png',
              sizes: '358x740',
              form_factor: 'narrow'
            }
          ],
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      }),
      ...(isAnalyze ? [analyzer({ analyzerPort: 8889 })] : [])
    ],

    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
