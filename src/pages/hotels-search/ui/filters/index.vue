<template>
  <form class="filters" @submit.prevent="emit('applyFilters', filters)">
    <div class="list">
      <Country v-model="filters.country" :countries="filtersData.countries" />

      <Type v-model="filters.type" :types="filtersData.types" />

      <StarsCount
        v-model="filters.starsCount"
        :max-stars-count="filtersData.starsCount"
      />

      <ReviewsAmount v-model="filters.reviewsCount" />

      <Price v-model="filters.maxPrice" :price-range="filtersData.priceRange" />
    </div>

    <div class="filter-actions">
      <Button
        @click="handleApplyFiltersClicked(filters)"
        size="lg"
        type="submit"
      >
        Применить фильтр
      </Button>

      <Button
        variant="outlined"
        size="lg"
        @click="handleClearFiltersClicked"
        type="button"
      >
        <template #icon>
          <XMark />
        </template>

        Очистить фильтр
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Button } from "@/shared/ui/button";
import ReviewsAmount from "./reviews-amount.vue";
import type { HotelFilters } from "../../model";
import { useVModel } from "@vueuse/core";

import XMark from "~icons/rs-icons/xmark";
import type { HotelFiltersData } from "@/shared/api/hotels";
import StarsCount from "./stars-count.vue";
import Price from "./price.vue";
import Type from "./type.vue";
import Country from "./country.vue";

const props = defineProps<{
  filters: HotelFilters;
  filtersData: HotelFiltersData;
}>();
const emit = defineEmits<{
  "update:filters": [HotelFilters];
  applyFilters: [HotelFilters];
  clearFilters: [];
}>();
const filters = useVModel(props, "filters", emit);

const handleApplyFiltersClicked = (filters: HotelFilters) => {
  emit("applyFilters", filters);
};

const handleClearFiltersClicked = () => {
  emit("clearFilters");
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: $rs-breakpoint-lg) {
    width: 325px;
  }
}

.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
