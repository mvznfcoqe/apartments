<template>
  <div class="list">
    <Card v-for="hotel of pageHotels" :key="hotel.id" :hotel="hotel" />
  </div>

  <div class="pagination">
    <Pagination
      :items-per-page="cardsMaxCount"
      :total="hotels.length"
      v-model:page="page"
    />
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";
import {
  type UseOffsetPaginationReturn,
  useOffsetPagination,
  useVModel,
} from "@vueuse/core";
import { type UnwrapNestedRefs, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Pagination } from "@/shared/ui/pagination";

import { cardsMaxCount } from "../../config";
import Card from "./card/index.vue";

const props = defineProps<{ hotels: Hotel[]; page: number }>();
const emit = defineEmits<{ "update:page": [number] }>();
const page = useVModel(props, "page", emit);

const router = useRouter();
const route = useRoute();

const getPageHotels = (
  currentPage: UnwrapNestedRefs<UseOffsetPaginationReturn>["currentPage"],
) => {
  const startIndex = (currentPage - 1) * cardsMaxCount;
  const endIndex = startIndex + cardsMaxCount;

  return props.hotels.slice(startIndex, endIndex);
};

const pageHotels = ref<Hotel[]>(getPageHotels(page.value));

const handlePageChange = async (
  paginationData: UnwrapNestedRefs<UseOffsetPaginationReturn>,
) => {
  pageHotels.value = getPageHotels(paginationData.currentPage);

  await router.replace({ query: { ...route.query, page: page.value } });
};

const { currentPage } = useOffsetPagination({
  total: () => props.hotels.length,
  page,
  pageSize: cardsMaxCount,
  onPageChange: handlePageChange,
});

watch(
  () => props.hotels.length,
  () => {
    pageHotels.value = getPageHotels(currentPage.value);
  },
);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pagination {
  margin-top: 40px;
}
</style>
