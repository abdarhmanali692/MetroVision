import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Expose API_BASE_URL and USE_MOCK exactly as named in the spec.
  envPrefix: ['API_', 'USE_'],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});
