import "@fontsource/pt-sans";
import "@unocss/reset/tailwind.css";
import "@/shared/assets/styles/index.scss";

import { createApp } from "vue";
import { router } from "@/pages";
import App from "./index.vue";

createApp(App).use(router).mount("#app");
