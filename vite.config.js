import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { visualizer } from "rollup-plugin-visualizer";
import { Import } from "lucide-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
           target: import.meta.env.VITE_BASE_URL,
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        timeout: 60000,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Connection", "keep-alive");
          });
        },
      },
    },
  },


  

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],

          "framer-motion": ["framer-motion"],
        },
      },
    },
    cssMinify: false,
    sourcemap: false,
    minify: false,
  },
});
