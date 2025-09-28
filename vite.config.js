import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
/* export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}) */

export default defineConfig({
    plugins: [vue()],

    // base URL → gunakan '/' karena langsung di root subdomain
    base: "/",

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },

    build: {
        outDir: "dist", // folder hasil build
        assetsDir: "assets", // folder untuk JS/CSS/images
        sourcemap: false, // biar file build lebih kecil
        target: "es2015", // lebih compatible di browser lama
    },

    /* server: {
        port: 5173, // hanya untuk local dev
        open: true,
    }, */
});
