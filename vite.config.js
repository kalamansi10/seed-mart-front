import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
        },
        "/users": {
          target: `${env.VITE_BACKEND_URL}`,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
