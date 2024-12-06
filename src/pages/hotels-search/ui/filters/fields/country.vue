<template>
  <Filter title="Страна">
    <Select
      with-search
      :model-value="modelValue ?? undefined"
      @update:model-value="handleCountryChanged"
      :items="countries"
      placeholder="Например, Греция"
    />
  </Filter>
</template>

<script setup lang="ts">
import type { HotelFilters } from "../../../model";
import type { HotelFiltersData } from "@/shared/api/hotels";
import { useVModel } from "@vueuse/core";

import { Select } from "@/shared/ui/select";

import Filter from "../filter.vue";

const props = defineProps<{
  modelValue: HotelFilters["country"];
  countries: HotelFiltersData["countries"];
}>();
const emit = defineEmits<{ "update:modelValue": [HotelFilters["country"]] }>();
const modelValue = useVModel(props, "modelValue", emit);

const handleCountryChanged = (event: string | string[]) => {
  if (Array.isArray(event)) {
    return;
  }

  modelValue.value = event;
};
</script>
