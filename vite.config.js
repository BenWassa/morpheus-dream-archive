import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/morpheus-dream-archive/',
  build: {
    outDir: 'docs',
  },
});
