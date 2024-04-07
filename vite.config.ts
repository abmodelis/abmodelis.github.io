import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      "process.env": {
        NODE_ENV: env.NODE_ENV,
        REACT_APP_API_URL: env.REACT_APP_API_URL,
        REACT_APP_API_USERNAME: env.REACT_APP_API_USERNAME,
        REACT_APP_API_PASSWORD: env.REACT_APP_API_PASSWORD,
      },
    },
    resolve: {
      alias: {
        icons: "/src/icons",
        components: "/src/components",
        views: "/src/views",
        services: "/src/services",
        types: "/src/types",
        layout: "/src/layout",
      },
    },
  };
});
