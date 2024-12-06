<template>
  <TooltipRoot
    v-bind="forward"
    :open="isTouchable || isOpen"
    @update:open="handleOpenChanged"
  >
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>

    <TooltipPortal>
      <TooltipContent
        side="bottom"
        align="center"
        class="tooltip-content"
        @pointer-down-outside.stop
      >
        {{ content }}

        <TooltipArrow :width="11" :height="5" class="tooltip-arrow" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  type TooltipRootEmits,
  type TooltipRootProps,
  TooltipTrigger,
  useForwardPropsEmits,
} from "radix-vue";
import { ref } from "vue";

import { useIsTouchable } from "@/shared/lib/is-touchable";

const props = defineProps<TooltipRootProps & { content?: string }>();
const emits = defineEmits<TooltipRootEmits>();

const forward = useForwardPropsEmits(props, emits);

const { isTouchable } = useIsTouchable();

const isOpen = ref(isTouchable.value);

const handleOpenChanged = (open: boolean) => {
  if (isTouchable.value) {
    return;
  }

  isOpen.value = open;
};
</script>

<style lang="scss">
.tooltip-content {
  border-radius: var(--rs-border-radius-sm);
  border: var(--rs-border);
  background-color: rgb(var(--rs-color-white));
  padding: 2px 8px;

  user-select: none;

  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.tooltip-content[data-state="delayed-open"][data-side="bottom"] {
  animation-name: slideUpAndFade;
}

.tooltip-arrow {
  fill: white;

  filter: drop-shadow(0 0 3px gray);
  clip-path: inset(0 -10px -10px -10px);
  fill: white;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
