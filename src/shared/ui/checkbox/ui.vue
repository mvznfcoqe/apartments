<template>
  <div class="checkbox-container">
    <CheckboxRoot v-model:checked="modelValue" class="checkbox" :id="id">
      <CheckboxIndicator class="indicator">
        <Checkmark />
      </CheckboxIndicator>
    </CheckboxRoot>

    <label class="label" v-if="label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { useId } from "vue";
import Checkmark from "~icons/rs-icons/checkmark";

const props = defineProps<{ modelValue?: boolean; label?: string }>();
const emit = defineEmits<{ "update:modelValue": [boolean] }>();
const modelValue = useVModel(props, "modelValue", emit);

const id = useId();
</script>

<style lang="scss">
.checkbox-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.checkbox {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: var(--rs-border);

  display: flex;
  align-items: center;
  justify-content: center;

  &[data-state="checked"] {
    background-color: rgb(var(--rs-color-success));
    border: none;
  }
}

.indicator {
  color: #fff;

  & svg {
    font-size: 10px;
  }
}

.label {
  cursor: pointer;
}
</style>
