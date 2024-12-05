<template>
  <TooltipProvider :delay-duration="200">
    <main class="main">
      <RouterView />
    </main>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { TooltipProvider } from "radix-vue";
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
  max-width: 1200px;
  padding: 20px;
  width: 100%;
}
</style>
