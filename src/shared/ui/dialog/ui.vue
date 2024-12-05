<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="dialog-overlay">
        <DialogContent class="dialog-content">
          <DialogTitle class="dialog-title">
            {{ title }}
          </DialogTitle>

          <slot />

          <DialogClose class="dialog-close">
            <XMark class="dialog-close-icon" />
          </DialogClose>
        </DialogContent>
      </DialogOverlay>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";

import XMark from "~icons/rs-icons/xmark";

defineProps<{ title: string }>();
</script>

<style lang="scss">
.dialog-overlay {
  background-color: rgba(var(--rs-color-overlay));
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  position: fixed;
  display: grid;
  place-items: center;
  overflow-y: auto;

  inset: 0;
}

.dialog-content {
  background-color: rgb(var(--rs-color-white));
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;

  width: 100%;
  max-width: 450px;
  padding: 25px;

  margin: 20px 0;

  position: relative;

  &:focus {
    outline: none;
  }
}

.dialog-title {
  font-size: 21px;
  font-weight: var(--rs-font-weight-bold);
  margin-bottom: 10px;
}

.dialog-close {
  position: absolute;
  right: 25px;
  top: 25px;
}

.dialog-close-icon {
  height: 15px;
  width: 15px;
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
