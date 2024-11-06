import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
        name: "mars",
        filename: "marsEntry.js",
        exposes: { 
          "./Button": "./src/Button", 
          "./store": "./src/store.ts",
        },
        shared: ["react", "react-dom", "jotai"]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  }
})
