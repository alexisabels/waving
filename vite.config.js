import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },

      manifest: {
        theme_color: "#EBE3DD",
        name: "Waving Social",
        start_url: "/",
        display: "standalone",
        background_color: "#EBE3DD",
        lang: "es",
        scope: "/",
        icons: [
          {
            src: "assets/img/ocean.jpg",
            type: "image/jpg",
            purpose: "any maskable",
          },
        ],
        short_name: "Waving",
      },
    }),
  ],
  root: "./",
  build: {
    outDir: "dist",
  },
  publicDir: "public",
});
// {"name":"waving","short_name":"waving","start_url":"/","display":"standalone","background_color":"#ffffff","lang":"en","scope":"/","theme_color":"#EBE3DD"}
