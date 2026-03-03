import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      federation({
        name: "host-app",
        remotes: {
          // ✅ just URL (NOT name@url)
chatRemote: env.VITE_CHAT_REMOTE_URL || "http://localhost:5001/remoteEntry.js"
        },
        shared: ["react", "react-dom"],
      }),
    ],
    server: {
      port: 5005,
      strictPort: true,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
      server: {
      port: 5005,
      strictPort: true,
    }
  };
});