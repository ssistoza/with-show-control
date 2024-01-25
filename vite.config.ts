/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { peerDependencies } from './package.json';

const viteConfig = defineConfig({
  build: {
    lib: {
      entry: 'withShowControl.tsx',
      name: 'index',
      formats: ['cjs', 'es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
  },
});

export default viteConfig;
