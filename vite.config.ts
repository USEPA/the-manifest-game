/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    outDir: 'build',
    chunkSizeWarningLimit: 500,
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8', // 'v8' or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/src/setupTests.ts',
        '**/src/index.tsx',
        '**/__mocks__/*',
        '**/node_modules/**/*',
        '**/build/**',
        '**/dist/**',
        '**/coverage/**',
        '**/public/**',
        '**/*.d.ts',
        '**/index.tsx',
        '**/index.ts',
        '**/index.html',
        '**/jsonDummyTree.ts',
        '**/.eslintrc.cjs',
      ],
    },
  },
});
