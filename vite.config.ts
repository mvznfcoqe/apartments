import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import Iconify from "unplugin-iconify-generator/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        quiteDeps: true,
        additionalData: `@use "@/shared/assets/styles/global.scss" as *;`,
        api: "modern",
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    Icons({
      compiler: "vue3",
      customCollections: {
        "rs-icons": FileSystemIconLoader("./src/shared/assets/icons"),
      },
    }),
    svgLoader({
      defaultImport: "component",
    }),
    Iconify({
      collections: {
        "rs-icons": "./src/shared/assets/icons",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "apartments",
});
