<template>
  <div
    class="base-input"
    @mousedown="handleMousedownClicked"
    :class="{ 'base-input_readonly': readonly }"
  >
    <div class="left-content" @mousedown.stop>
      <slot name="left-content" />
    </div>

    <div @mousedown.stop class="input-container">
      <slot name="input" :input-props="inputProps">
        <Input
          ref="input"
          v-bind="inputProps"
          class="input"
          v-model="modelValue"
        />
      </slot>
    </div>

    <div class="right-content" @mousedown.stop>
      <slot name="right-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useVModel } from "@vueuse/core";
import Input from "./input.vue";
import type { BaseInputEmit, BaseInputProps } from "../types";

const props = defineProps<BaseInputProps>();
const emit = defineEmits<BaseInputEmit>();
const modelValue = useVModel(props, "modelValue", emit);

const input = ref<InstanceType<typeof Input>>();

const handleMousedownClicked = (event: MouseEvent) => {
  if (props.readonly) return;

  event.preventDefault();
  emit("wrapperClicked");

  if (!input.value) return;

  input.value.focused = true;
};

const inputProps = computed(() => {
  const { modelValue, ...otherProps } = props;

  return otherProps;
});
</script>

<style lang="scss" scoped>
.base-input {
  cursor: text;
  padding: 14px 20px;
  border: var(--rs-border);
  border-radius: var(--rs-border-radius-sm);

  display: flex;
  align-items: center;
  gap: 10px;

  &_readonly {
    cursor: inherit;
  }
}

.input-container {
  width: 100%;
}

.left-content:empty,
.right-content:empty {
  display: none;
}
</style>
