<template>
  <SliderRoot v-bind="forward" class="slider-root">
    <SliderTrack class="slider-track">
      <SliderRange class="slider-range" />
    </SliderTrack>

    <Tooltip :content="tooltipContent" disable-closing-trigger>
      <SliderThumb v-for="(_, i) in modelValue" :key="i" class="slider-thumb" />
    </Tooltip>
  </SliderRoot>
</template>

<script setup lang="ts">
import {
  SliderRoot,
  SliderRange,
  type SliderRootEmits,
  type SliderRootProps,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from "radix-vue";
import { Tooltip } from "../tooltip";
import { computed } from "vue";

const props = defineProps<SliderRootProps & { tooltipContent?: string }>();
const emits = defineEmits<SliderRootEmits>();

const forward = useForwardPropsEmits(props, emits);

const tooltipContent = computed(() => {
  if (props.tooltipContent) return props.tooltipContent;
  if (!props.modelValue || !props.modelValue[0]) return "";

  return props.modelValue[0].toString();
});
</script>

<style lang="scss">
.slider-root {
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
}

.slider-track {
  background-color: rgb(var(--rs-color-border));
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
}

.slider-range {
  position: absolute;
  background-color: rgb(var(--rs-color-success));
  border-radius: 9999px;
  height: 100%;
}

.slider-thumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: rgb(var(--rs-color-white));
  border: 2px solid rgb(var(--rs-color-success));
  border-radius: 10px;
}
</style>
