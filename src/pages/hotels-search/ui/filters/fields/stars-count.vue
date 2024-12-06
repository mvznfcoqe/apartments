<template>
  <Filter title="Количество звезд">
    <ToggleGroupRoot v-model="modelValue" type="multiple" class="stars-count">
      <ToggleGroupItem
        v-for="i in maxStarsCount"
        :value="i.toString()"
        as-child
      >
        <Checkbox
          :model-value="isVariantActive({ i: i.toString() })"
          @update:model-value="toggleVariant({ i: i.toString() })"
          :label="`${i} ${getPluralForm({ number: i, forms: pluralForms })}`"
        />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  </Filter>
</template>

<script setup lang="ts">
import type { HotelFilters } from "../../../model";
import { useVModel } from "@vueuse/core";
import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";

import { getPluralForm } from "@/shared/lib/plural-rules/ru";
import { Checkbox } from "@/shared/ui/checkbox";

import Filter from "../filter.vue";

const props = defineProps<{
  modelValue: HotelFilters["starsCount"];
  maxStarsCount: number;
}>();
const emit = defineEmits<{
  "update:modelValue": [HotelFilters["starsCount"]];
}>();
const modelValue = useVModel(props, "modelValue", emit);

const pluralForms = ["", "звезда", "звезды", "звезд"];

const isVariantActive = ({ i }: { i: string }) => {
  return modelValue.value?.includes(i);
};

const toggleVariant = ({ i }: { i: string }) => {
  if (isVariantActive({ i })) {
    modelValue.value = modelValue.value.filter((variant) => variant !== i);
  } else {
    modelValue.value.push(i);
  }
};
</script>

<style lang="scss" scoped>
.stars-count {
  display: flex;
  flex-direction: column;
  gap: 12px;

  border: var(--rs-border);
  border-radius: var(--rs-border-radius-sm);
  padding: 26px 20px;
}
</style>
