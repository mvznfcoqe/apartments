import { createRouter, createWebHistory } from "vue-router";

import { HotelsSearchPage } from "./hotels-search";

const routes = [
  {
    path: "/",
    component: HotelsSearchPage,
  },
];

export const router = createRouter({ history: createWebHistory(), routes });
