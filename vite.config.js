import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target:  "http://localhost:3000",
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production" ? true : false, 
        timeout: 60000, // Increase timeout to 60 seconds
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Connection", "keep-alive");
          });
         }
      },
    },
    
  },
})
