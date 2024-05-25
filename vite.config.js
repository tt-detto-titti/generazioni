import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import Vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), Vuetify(), Components()],
  root: "frontend",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
