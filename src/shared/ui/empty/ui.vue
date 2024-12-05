<template>
  <div class="empty">
    <div class="image">
      <Empty />
    </div>

    <div class="content">
      <p class="title">{{ title }}</p>

      <p class="description" v-if="description">
        {{ description }}
      </p>
    </div>

    <div class="action" v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Empty from "./assets/empty.svg";

defineProps<{ title: string; description?: string }>();
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  max-width: 350px;
}

.content {
  margin-top: 34px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 18px;
  font-weight: var(--rs-font-weight-bold);
}

.description {
  color: rgb(var(--rs-color-text--secondary));
}

.action {
  margin-top: 24px;
}
</style>
