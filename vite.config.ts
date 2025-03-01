import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api/v3': {
        target: 'https://petstore3.swagger.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v3/, '/api/v3'),
      },
    },
  },
});
