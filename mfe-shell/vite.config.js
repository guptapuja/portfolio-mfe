import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// This must be a function to accept ({ mode })
export default defineConfig(({ mode }) => {
  // This line now has access to the 'mode' variable
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: 'host-app',
        remotes: {
          chatRemote: env.VITE_CHAT_REMOTE_URL || 'http://localhost:5001/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    // Adding this to match your terminal command
    server: {
      port: 5005,
      strictPort: true,
    }
  };
});