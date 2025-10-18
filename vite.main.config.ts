import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['better-sqlite3'],
    },
  },
  resolve: {
    alias: {
      'better-sqlite3': path.resolve(__dirname, 'node_modules/better-sqlite3'),
    },
  },
});