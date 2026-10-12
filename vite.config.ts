import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // `npm run dev:worker` serves the API on :8787 for local development.
    proxy: { '/api': 'http://localhost:8787' },
  },
  build: {
    // The main chunk is mostly react-dom + react-router (~160 kB gzipped); pages are split.
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
