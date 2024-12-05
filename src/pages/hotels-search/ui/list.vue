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
import Card from "./card/index.vue";
import {
  useOffsetPagination,
  type UseOffsetPaginationReturn,
} from "@vueuse/core";
import { cardsMaxCount } from "../config";
import { ref, type UnwrapNestedRefs } from "vue";
import { Pagination } from "@/shared/ui/pagination";
import { usePage } from "../lib/use-page";

const props = defineProps<{ hotels: Hotel[] }>();

const page = usePage();

const getPageHotels = (
  currentPage: UnwrapNestedRefs<UseOffsetPaginationReturn>["currentPage"],
) => {
  const startIndex = (currentPage - 1) * cardsMaxCount;
  const endIndex = startIndex + cardsMaxCount;

  return props.hotels.slice(startIndex, endIndex);
};

const pageHotels = ref<Hotel[]>(getPageHotels(page.value));

const handlePageChange = (
  paginationData: UnwrapNestedRefs<UseOffsetPaginationReturn>,
) => {
  pageHotels.value = getPageHotels(paginationData.currentPage);
};

useOffsetPagination({
  total: props.hotels.length,
  page,
  pageSize: cardsMaxCount,
  onPageChange: handlePageChange,
});
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
