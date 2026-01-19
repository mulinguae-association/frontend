import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  server: {
    port: 3000, // Matches CRA's default port
    open: true, // Automatically opens the browser
  },

  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "i18n-vendor": ["react-i18next", "i18next"],
        },
      },
    },
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});
