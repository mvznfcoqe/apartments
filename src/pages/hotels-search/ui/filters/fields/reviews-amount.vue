<template>
  <Filter title="Количество отзывов (от)">
    <InputNumber
      placeholder="Например, от 10"
      :model-value="modelValue ?? undefined"
      @update:model-value="modelValue = Number($event)"
    />
  </Filter>
</template>

<script setup lang="ts">
import type { HotelFilters } from "../../../model";
import { useVModel } from "@vueuse/core";

import { InputNumber } from "@/shared/ui/input-number";

import Filter from "../filter.vue";

const props = defineProps<{ modelValue: HotelFilters["reviewsCount"] }>();
const emit = defineEmits<{
  "update:modelValue": [HotelFilters["reviewsCount"]];
}>();
const modelValue = useVModel(props, "modelValue", emit);
</script>
