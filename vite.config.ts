import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';

  return {
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      svgr(),
      ViteImageOptimizer(),
      ...(isAnalyze ? [analyzer({ analyzerPort: 8889 })] : [])
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
