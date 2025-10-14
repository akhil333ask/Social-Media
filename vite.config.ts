import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- ADDED

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // --- START MODIFICATION ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // --- END MODIFICATION ---
});