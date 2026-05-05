import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const isGitHubPages = process.env.VITE_GH_PAGES === 'true';

// https://vite.dev/config/
export default defineConfig({
  base: isGitHubPages ? '/rick-morty/' : '/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
