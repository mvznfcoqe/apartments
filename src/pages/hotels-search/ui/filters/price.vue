<template>
  <Filter title="Цена до">
    <Slider
      v-model="modelValue"
      :min="priceRange.from"
      :max="priceRange.to"
      :tooltip-content="sliderTooltipContent"
    />
  </Filter>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { HotelFilters } from "../../model";
import Filter from "./filter.vue";
import { Slider } from "@/shared/ui/slider";
import type { HotelFiltersData } from "@/shared/api/hotels";
import { computed } from "vue";

const props = defineProps<{
  modelValue: HotelFilters["maxPrice"];
  priceRange: HotelFiltersData["priceRange"];
}>();
const emit = defineEmits<{
  "update:modelValue": [HotelFilters["reviewsCount"]];
}>();
const modelValue = useVModel(props, "modelValue", emit);

const sliderTooltipContent = computed(() => {
  const parser = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  return parser.format(modelValue.value[0]);
});
</script>
