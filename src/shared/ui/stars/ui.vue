<template>
  <div class="stars">
    <Star
      v-for="i in totalStars"
      class="star"
      :class="[`star_${i <= modelValue ? 'active' : 'inactive'}`]"
    />
  </div>
</template>

<script setup lang="ts">
import Star from "~icons/rs-icons/star";
import { totalStars } from "./config";

defineProps<{ modelValue: number }>();
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  gap: 6px;
}

.star {
  font-size: 14px;

  &_active {
    color: rgb(var(--rs-star-color-active));
  }

  &_inactive {
    color: rgb(var(--rs-star-color-inactive));
  }
}
</style>
