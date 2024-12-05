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
      v-model:page="page"
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
  getFilteredHotels,
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
import { startPage } from "../config";
import { usePage } from "../lib/use-page";

const breakpoints = useBreakpoints(breakpointsConfig);

const isMobileFilters = breakpoints.smallerOrEqual("lg");

const router = useRouter();
const route = useRoute();

const page = usePage();

const filters = ref<HotelFilters>({
  maxPrice: [],
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

    filters.value.maxPrice = getDefaultHotelFilters({
      hotelFiltersData: response,
    }).maxPrice;

    filtersDataLoadState.value = "success";
  } catch {}
};

const filterHotels = () => {
  if (!hotels.value) {
    return;
  }

  filteredHotels.value = getFilteredHotels({
    filters: filters.value,
    hotels: hotels.value,
  });
};

const saveFiltersToQuery = async () => {
  await router.replace({
    query: {
      ...filters.value,
      page: startPage,
      country: filters.value.country || undefined,
      reviewsCount: filters.value.reviewsCount || undefined,
    },
  });
};

const applyFilters = () => {
  filterHotels();
  saveFiltersToQuery();
};

const clearFilters = async () => {
  if (!filtersData.value) return;

  filters.value = getDefaultHotelFilters({
    hotelFiltersData: filtersData.value,
  });
  filteredHotels.value = hotels.value;
  await router.push({ query: { ...route.query, ...filters.value } });
};

const getQueryFilters = () => {
  const maxPrice = queryToArray(route.query.maxPrice);

  if (maxPrice[0]) {
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
    await loadFiltersData();

    getQueryFilters();

    await loadHotels();

    filterHotels();
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
