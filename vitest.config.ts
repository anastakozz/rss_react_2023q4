// / <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vitest/config'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // setupFiles: ["./tests/setupTests.ts"],
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      enabled: true,
      all: true,
      reporter: ["text"],
      exclude:[".next/**", "tests/**", "*.config.js" ]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
