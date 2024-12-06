<template>
  <form class="filters" @submit.prevent="handleFormSubmit">
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
      <Button size="lg" type="submit"> Применить фильтры </Button>

      <Button
        variant="outlined"
        size="lg"
        @click="handleClearFiltersClicked"
        type="button"
      >
        <template #icon>
          <XMark />
        </template>

        Очистить фильтры
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { HotelFilters } from "../../model";
import type { HotelFiltersData } from "@/shared/api/hotels";
import { useVModel } from "@vueuse/core";
import XMark from "~icons/rs-icons/xmark";

import { Button } from "@/shared/ui/button";

import Country from "./fields/country.vue";
import Price from "./fields/price.vue";
import ReviewsAmount from "./fields/reviews-amount.vue";
import StarsCount from "./fields/stars-count.vue";
import Type from "./fields/type.vue";

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

const handleFormSubmit = () => {
  emit("applyFilters", filters.value);
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
