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
      v-model:page="page"
      :hotels="filteredHotels"
      @clear-filters="clearFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  type Hotel,
  type HotelFiltersData,
  type LoadState,
  getHotels,
  getHotelsFiltersData,
} from "@/shared/api/hotels";
import { breakpointsConfig } from "@/shared/config/breakpoints";
import { objectKeys } from "@/shared/lib/object-keys";
import { queryToString } from "@/shared/lib/query-to-string";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";

import { startPage } from "../config";
import {
  type HotelFilters,
  getDefaultHotelFilters,
  getFilteredHotels,
  getQueryFilters,
} from "../model";
import Content from "./content/index.vue";
import Filters from "./filters/index.vue";

const breakpoints = useBreakpoints(breakpointsConfig);
const isMobileFilters = breakpoints.smallerOrEqual("lg");

const router = useRouter();
const route = useRoute();

const page = ref(startPage);

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

const filterHotels = () => {
  if (!hotels.value) {
    return;
  }

  filteredHotels.value = getFilteredHotels({
    filters: filters.value,
    hotels: hotels.value,
  });
};

const loadHotels = async () => {
  try {
    hotelsLoadState.value = "loading";

    const response = await getHotels();

    hotels.value = response.hotels;
    filterHotels();

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
  page.value = 1;

  filterHotels();
  saveFiltersToQuery();
};

const clearFilters = async () => {
  if (!filtersData.value) return;

  const defaultFilters = getDefaultHotelFilters({
    hotelFiltersData: filtersData.value,
  });

  filters.value = defaultFilters;
  filteredHotels.value = hotels.value;

  await router.replace({
    query: { page: startPage },
  });
};

const setFiltersFromQuery = () => {
  const queryFilters = getQueryFilters({ query: route.query });

  console.log(queryFilters);

  for (const key of objectKeys(queryFilters)) {
    if (queryFilters[key] && key in filters.value) {
      filters.value[key] = queryFilters[key] as never;
    }
  }
};

const setPageFromQuery = () => {
  const queryPage = queryToString(route.query.page)
    ? Number(queryToString(route.query.page))
    : undefined;

  if (!queryPage) {
    return;
  }

  page.value = queryPage;
};

onMounted(async () => {
  try {
    await loadFiltersData();

    setFiltersFromQuery();
    setPageFromQuery();

    await loadHotels();
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
