<template>
  <Separator :orientation="orientation" class="separator" />
</template>

<script setup lang="ts">
import { Separator } from "radix-vue";

withDefaults(defineProps<{ orientation?: "horizontal" }>(), {
  orientation: "horizontal",
});
</script>

<style lang="scss" scoped>
.separator {
  background-color: rgb(var(--rs-color-border));

  &[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation="vertical"] {
    height: 100%;
    width: 1px;
  }
}
</style>
