<template>
  <input
    v-bind="inputProps"
    ref="input"
    v-model="modelValue"
    class="input"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import type { BaseInputEmit } from "../types";
import { useFocus, useVModel } from "@vueuse/core";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    readonly?: boolean;
    placeholder?: string;
    type?: "text" | "number";
  }>(),
  { type: "text" },
);
const emit = defineEmits<Omit<BaseInputEmit, "wrapperClicked">>();
const modelValue = useVModel(props, "modelValue", emit);

const input = ref<HTMLInputElement>();

const { focused } = useFocus(input);

defineExpose({ focused });

const inputProps = computed(() => {
  const { modelValue, ...otherProps } = props;

  return otherProps;
});
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  text-overflow: ellipsis;
  cursor: inherit;

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    background-color: transparent;
  }

  &::placeholder {
    color: rgb(var(--rs-color-text--secondary));
  }
}
</style>
