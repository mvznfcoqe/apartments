<template>
  <Filter title="Страна">
    <Select
      with-search
      v-model="modelValue"
      :items="countries"
      placeholder="Например, Греция"
    />
  </Filter>
</template>

<script setup lang="ts">
import type { HotelFiltersData } from "@/shared/api/hotels";
import type { HotelFilters } from "../../model";
import Filter from "./filter.vue";
import { useVModel } from "@vueuse/core";
import { Select } from "@/shared/ui/select";

const props = defineProps<{
  modelValue?: HotelFilters["country"];
  countries: HotelFiltersData["countries"];
}>();
const emit = defineEmits<{ "update:modelValue": [HotelFilters["country"]] }>();
const modelValue = useVModel(props, "modelValue", emit);
</script>
