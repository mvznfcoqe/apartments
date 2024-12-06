import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { queryToString } from "@/shared/lib/query-to-string";

import { startPage } from "../config";

export const usePage = () => {
  const route = useRoute();
  const router = useRouter();

  return computed({
    get() {
      return queryToString(route.query.page)
        ? Number(route.query.page)
        : startPage;
    },
    async set(page) {
      await router.replace({ query: { ...route.query, page } });
    },
  });
};
