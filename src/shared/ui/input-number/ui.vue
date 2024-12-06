<template>
  <NumberFieldRoot
    v-model="modelValue"
    :min="0"
    :format-options="{ maximumFractionDigits: 0, useGrouping: false }"
  >
    <BaseInput
      v-bind="baseInputProps"
      @wrapper-clicked="handleWrapperClicked"
      :model-value="modelValue"
    >
      <template #input="{ inputProps }">
        <NumberFieldInput as-child>
          <BaseInputField
            v-bind="inputProps"
            ref="input"
            :model-value="modelValue"
          />
        </NumberFieldInput>
      </template>
    </BaseInput>
  </NumberFieldRoot>
</template>

<script setup lang="ts">
import type { BaseInputProps } from "../base-input/types";
import { useVModel } from "@vueuse/core";
import { NumberFieldInput, NumberFieldRoot } from "radix-vue";
import { computed, ref } from "vue";

import { BaseInput, BaseInputField } from "../base-input";

const props = defineProps<
  Omit<BaseInputProps, "modelValue"> & { modelValue?: number }
>();
const emit = defineEmits<{ "update:modelValue": [number | string] }>();
const modelValue = useVModel(props, "modelValue", emit);

const input = ref<InstanceType<typeof BaseInputField>>();

const handleWrapperClicked = () => {
  if (!input.value) return;

  input.value.focused = true;
};

const baseInputProps = computed(() => {
  const { modelValue, ...otherProps } = props;

  return otherProps;
});
</script>
