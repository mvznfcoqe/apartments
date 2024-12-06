<template>
  <Filter title="Тип">
    <Select
      v-model="modelValue"
      multiple
      :items="types"
      placeholder="Можно выбрать несколько"
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
  modelValue: HotelFilters["type"];
  types: HotelFiltersData["types"];
}>();
const emit = defineEmits<{ "update:modelValue": [HotelFilters["type"]] }>();
const modelValue = useVModel(props, "modelValue", emit);
</script>
