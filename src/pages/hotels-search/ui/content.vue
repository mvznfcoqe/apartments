<template>
  <div class="content">
    <template v-if="hotels && hotels.length">
      <List :hotels="hotels" />
    </template>

    <div v-else class="empty-content">
      <Empty
        :title="emptyContentText.title"
        :description="emptyContentText.description"
      >
        <template #action>
          <Button variant="light" size="lg" @click="handleClearFiltersClicked">
            Очистить фильтр
          </Button>
        </template>
      </Empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";
import { Empty } from "@/shared/ui/empty";
import { Button } from "@/shared/ui/button";
import { emptyContentText } from "../config";
import List from "./list.vue";

defineProps<{ hotels?: Hotel[] }>();
const emit = defineEmits<{ clearFilters: [] }>();

const handleClearFiltersClicked = () => {
  emit("clearFilters");
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}

.empty-content {
  display: flex;
  justify-content: center;

  border: var(--rs-border);
  border-radius: var(--rs-border-radius-lg);
  padding: 57px 0;
}
</style>
