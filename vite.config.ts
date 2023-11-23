/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./src/tests/setupTests.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      enabled: true,
      all: true,
      reporter: ['text'],
    },
  },
});
