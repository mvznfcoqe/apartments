<template>
  <div class="stars">
    <Star
      v-for="i in totalStars"
      class="star"
      :class="[`star_${getIsStarActive({ i }) ? 'active' : 'inactive'}`]"
    />
  </div>
</template>

<script setup lang="ts">
import Star from "~icons/rs-icons/star";

import { totalStars } from "./config";

const props = defineProps<{ modelValue: number }>();

const getIsStarActive = ({ i }: { i: number }) => {
  return i <= props.modelValue;
};
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
