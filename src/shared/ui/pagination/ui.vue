<template>
  <PaginationRoot
    v-model:page="page"
    :total="total"
    :sibling-count="1"
    :items-per-page="itemsPerPage"
    show-edges
  >
    <PaginationList v-slot="{ items }" class="list">
      <PaginationPrev class="navigation navigation_prev">
        <span>
          <ArrowLeft />

          Назад
        </span>
      </PaginationPrev>

      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="button"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>

        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="ellipsis"
        >
          &#8230;
        </PaginationEllipsis>
      </template>

      <PaginationNext class="navigation navigation_next">
        <span>
          Следующая

          <ArrowRight />
        </span>
      </PaginationNext>
    </PaginationList>
  </PaginationRoot>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from "radix-vue";
import ArrowLeft from "~icons/rs-icons/arrow-left";
import ArrowRight from "~icons/rs-icons/arrow-right";

const props = defineProps<{
  page: number;
  total: number;
  itemsPerPage: number;
}>();
const emit = defineEmits<{ "update:page": [number] }>();
const page = useVModel(props, "page", emit);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--rs-color-white));
}

.button {
  font-size: 18px;
  font-weight: var(--rs-font-weight-light);
  color: rgb(var(--rs-color-text));
  text-align: center;

  border-radius: 2px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;

  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &[data-selected] {
    color: rgb(var(--rs-color-primary));
    background-color: rgba(var(--rs-color-primary), 0.1);
  }
}

.navigation {
  font-weight: var(--rs-font-weight-bold);
  color: rgb(var(--rs-color-text));

  &:disabled {
    color: rgba(var(--rs-color-text--secondary), 0.3);
  }

  &_prev {
    margin-right: 10px;

    @media (min-width: $rs-breakpoint-lg) {
      margin-right: 44px;
    }
  }

  &_next {
    margin-left: 10px;

    @media (min-width: $rs-breakpoint-lg) {
      margin-left: 44px;
    }
  }

  & span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.ellipsis {
  display: flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;

  font-weight: var(--rs-font-weight-bold);
  color: rgb(var(--rs-color-text));
}
</style>
