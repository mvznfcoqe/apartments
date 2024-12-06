<template>
  <div class="card">
    <Header :hotel="hotel" />
    <Footer :hotel="hotel" />
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";

import Footer from "./footer.vue";
import Header from "./header.vue";

defineProps<{ hotel: Hotel }>();
</script>

<style lang="scss" scoped>
.card {
  padding: 25px;
  border-radius: var(--rs-border-radius-lg);
  border: var(--rs-border);

  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
