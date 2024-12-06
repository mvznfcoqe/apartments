<template>
  <div class="content">
    <template v-if="hotels && hotels.length">
      <List :hotels="hotels" v-model:page="page" />
    </template>

    <div v-else class="empty-content">
      <Empty
        :title="emptyContentText.title"
        :description="emptyContentText.description"
      >
        <template #action>
          <Button variant="light" size="lg" @click="handleClearFiltersClicked">
            Очистить фильтры
          </Button>
        </template>
      </Empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";
import { useVModel } from "@vueuse/core";

import { Button } from "@/shared/ui/button";
import { Empty } from "@/shared/ui/empty";

import { emptyContentText } from "../../config";
import List from "./list.vue";

const props = defineProps<{ hotels?: Hotel[]; page: number }>();
const emit = defineEmits<{ clearFilters: []; "update:page": [number] }>();
const page = useVModel(props, "page", emit);

const handleClearFiltersClicked = async () => {
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
