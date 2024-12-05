<template>
  <div class="filter">
    <h3 class="title">
      {{ title }}
    </h3>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.title {
  font-weight: var(--rs-font-weight-bold);
}
</style>
