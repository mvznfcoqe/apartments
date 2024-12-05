<template>
  <div class="page">
    <div class="filters-trigger" v-if="isMobileFilters">
      <Dialog title="Фильтры">
        <template #trigger>
          <Button color="primary" size="lg">Фильтры</Button>
        </template>

        <Filters
          v-model:filters="filters"
          :filters-data="filtersData"
          v-if="filtersDataLoadState === 'success' && filtersData"
          @apply-filters="applyFilters"
          @clear-filters="clearFilters"
        />
      </Dialog>
    </div>

    <aside class="sidebar" v-else>
      <Filters
        v-if="filtersDataLoadState === 'success' && filtersData"
        v-model:filters="filters"
        :filters-data="filtersData"
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
      />
    </aside>

    <Content
      v-if="hotelsLoadState === 'success'"
      :hotels="filteredHotels"
      @clear-filters="clearFilters"
    />
  </div>
</template>

<script setup lang="ts">
import {
  getHotels,
  getHotelsFiltersData,
  type Hotel,
  type HotelFiltersData,
  type LoadState,
} from "@/shared/api/hotels";
import Content from "./content.vue";
import Filters from "./filters/index.vue";
import { onMounted, ref } from "vue";
import {
  filterHotels,
  getDefaultHotelFilters,
  type HotelFilters,
} from "../model";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { useRoute, useRouter } from "vue-router";
import { queryToString } from "@/shared/lib/query-to-string";
import { queryToArray } from "@/shared/lib/query-to-array";
import { useBreakpoints } from "@vueuse/core";
import { breakpointsConfig } from "@/shared/config/breakpoints";

const breakpoints = useBreakpoints(breakpointsConfig);

const isMobileFilters = breakpoints.smallerOrEqual("lg");

const router = useRouter();
const route = useRoute();

const filters = ref<HotelFilters>({
  maxPrice: [0],
  starsCount: [],
  type: [],
  country: null,
  reviewsCount: null,
});

const filtersDataLoadState = ref<LoadState>("idle");
const filtersData = ref<HotelFiltersData>();

const hotelsLoadState = ref<LoadState>("idle");
const hotels = ref<Hotel[]>();

const filteredHotels = ref<Hotel[]>();

const loadHotels = async () => {
  try {
    hotelsLoadState.value = "loading";

    const response = await getHotels();

    hotels.value = response.hotels;
    filteredHotels.value = response.hotels;

    hotelsLoadState.value = "success";
  } catch {}
};

const loadFiltersData = async () => {
  try {
    filtersDataLoadState.value = "loading";

    const response = await getHotelsFiltersData();
    filtersData.value = response;

    filtersDataLoadState.value = "success";

    return response;
  } catch {}
};

const applyFilters = () => {
  if (!hotels.value) {
    return;
  }

  filteredHotels.value = filterHotels({
    filters: filters.value,
    hotels: hotels.value,
  });

  router.push({ query: filters.value });
};

const clearFilters = () => {
  if (!filtersData.value) return;

  filters.value = getDefaultHotelFilters({
    hotelFiltersData: filtersData.value,
  });
  filteredHotels.value = hotels.value;
  router.push({ query: undefined });
};

const getQueryFilters = () => {
  const maxPrice = queryToArray(route.query.maxPrice);

  if (maxPrice) {
    filters.value.maxPrice = maxPrice.map((price) => Number(price));
  }

  const starsCount = queryToArray(route.query.starsCount);

  if (starsCount) {
    filters.value.starsCount = starsCount;
  }

  const type = queryToArray(route.query.type);

  if (type) {
    filters.value.type = type;
  }

  const country = queryToString(route.query.country);

  if (country) {
    filters.value.country = country;
  }

  const reviewsCount = queryToString(route.query.reviewsCount);

  if (reviewsCount) {
    filters.value.reviewsCount = Number(reviewsCount);
  }
};

onMounted(async () => {
  try {
    const filtersData = await loadFiltersData();

    if (!filtersData) {
      return;
    }

    if (!route.query.maxPrice) {
      filters.value.maxPrice = getDefaultHotelFilters({
        hotelFiltersData: filtersData,
      }).maxPrice;
    }

    getQueryFilters();

    await loadHotels();

    applyFilters();
  } catch {}
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: $rs-breakpoint-lg) {
    flex-direction: row;
    gap: 40px;
  }
}

.filters-trigger {
  & button {
    width: 100%;
  }
}
</style>
