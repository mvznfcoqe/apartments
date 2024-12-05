<template>
  <Filter title="Количество отзывов (от)">
    <InputNumber placeholder="Например, от 10" v-model="modelValue" />
  </Filter>
</template>

<script setup lang="ts">
import { InputNumber } from "@/shared/ui/input-number";
import { useVModel } from "@vueuse/core";
import Filter from "./filter.vue";
import type { HotelFilters } from "../../model";

const props = defineProps<{ modelValue?: HotelFilters["reviewsCount"] }>();
const emit = defineEmits<{
  "update:modelValue": [HotelFilters["reviewsCount"]];
}>();
const modelValue = useVModel(props, "modelValue", emit);
</script>
