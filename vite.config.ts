import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- IMPORT PATH MODULE

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADD THIS SECTION TO TEACH VITE ABOUT THE '@' ALIAS ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // --- END OF ADDITION ---
})