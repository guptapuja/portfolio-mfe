// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'chatRemote', // Unique name for this remote
      filename: 'remoteEntry.js', // The entry point file for the Shell
      exposes: {
        './ChatWidget': './src/components/ChatWidget.jsx', // The component we're sharing
      },
      shared: ['react', 'react-dom'], // Avoid duplicate React instances
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});