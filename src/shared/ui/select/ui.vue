<template>
  <PopoverRoot v-model:open="isOpen">
    <ComboboxRoot
      open
      v-model="modelValue"
      :multiple="multiple"
      v-model:search-term="searchTerm"
      :display-value="displayValue"
      :filter-function="filterFunction"
    >
      <PopoverTrigger class="select-trigger" as-child v-if="!withSearch">
        <BaseInput :model-value="inputValue" v-bind="baseInputProps" readonly />
      </PopoverTrigger>

      <PopoverAnchor v-else class="select-trigger" as-child>
        <BaseInput v-bind="baseInputProps">
          <template #input="{ inputProps }">
            <ComboboxInput as-child>
              <BaseInputField
                v-bind="inputProps"
                ref="input"
                @input="handleSearchTermChanged"
              />
            </ComboboxInput>
          </template>

          <template #left-content>
            <MagnifyingGlass />
          </template>

          <template #right-content>
            <XMark
              class="clear-icon"
              @click="handleClearClicked"
              v-if="isClearVisible"
            />
          </template>
        </BaseInput>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent side="bottom" align="start" @open-auto-focus.prevent>
          <ComboboxContent class="select-content">
            <ComboboxViewport class="select-viewport">
              <ComboboxEmpty as-child>
                <span class="select-empty">{{ emptyText }}</span>
              </ComboboxEmpty>

              <ComboboxItem
                v-for="item of items"
                :key="item.value"
                :value="item.value"
                class="select-item"
              >
                <Checkbox
                  @click.prevent
                  :label="item.title"
                  :model-value="getIsItemActive({ value: item.value })"
                />
              </ComboboxItem>
            </ComboboxViewport>
          </ComboboxContent>
        </PopoverContent>
      </PopoverPortal>
    </ComboboxRoot>
  </PopoverRoot>
</template>

<script setup lang="ts">
import type { BaseInputProps } from "../base-input/types";
import type { SelectItem } from "./types";
import { useVModel } from "@vueuse/core";
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "radix-vue";
import { computed, ref } from "vue";
import MagnifyingGlass from "~icons/rs-icons/magnifying-glass";
import XMark from "~icons/rs-icons/xmark";

import { BaseInput, BaseInputField } from "../base-input";
import { Checkbox } from "../checkbox";
import { emptyText } from "./config";

const props = defineProps<
  {
    modelValue?: string[] | string;
    items: SelectItem[];
    withSearch?: boolean;

    multiple?: boolean;
  } & Omit<BaseInputProps, "readonly" | "modelValue">
>();
const emit = defineEmits<{ "update:modelValue": [string[]] }>();
const modelValue = useVModel(props, "modelValue", emit);

const isOpen = ref(false);

const searchTerm = ref("");

const inputValue = computed(() => {
  if (!Array.isArray(modelValue.value)) {
    const item = props.items.find((item) => item.value === modelValue.value);

    if (!item) {
      return modelValue.value;
    }

    return item.title;
  }

  return modelValue.value
    .reduce((acc, value) => {
      const item = props.items.find((item) => item.value === value);

      if (!item) return acc;

      acc.push(item.title);

      return acc;
    }, [] as string[])
    .join(", ");
});

const getIsItemActive = ({ value }: { value: string }) => {
  if (!modelValue.value) return false;

  return modelValue.value.includes(value);
};

const handleSearchTermChanged = (term: string) => {
  if (!isOpen.value && term) {
    isOpen.value = true;
  }
};

const displayValue = (value: string) => {
  if (Array.isArray(modelValue)) {
    return value;
  }

  return inputValue.value || value;
};

const filterFunction = (value: string[], term: string) => {
  return value.filter((value) => {
    const item = props.items.find((item) => item.value === value);

    if (!item) return false;

    return item.title.toLowerCase().includes(term.toLowerCase());
  });
};

const isClearVisible = computed(() => {
  if (Array.isArray(modelValue.value) && modelValue.value.length) {
    return true;
  }

  return Boolean(modelValue.value);
});

const handleClearClicked = () => {
  modelValue.value = undefined;
};

const baseInputProps = computed(() => {
  const { modelValue, items, withSearch, ...otherProps } = props;

  return otherProps;
});

const openPopover = () => {
  isOpen.value = true;
};
</script>

<style lang="scss" scoped>
.select-trigger {
  cursor: pointer;
}

.select-content {
  max-width: var(--radix-popover-content-available-width);
  min-width: var(--radix-popover-trigger-width);

  height: 202px;

  position: absolute;
  overflow: hidden;
  background-color: white;
  margin-top: 8px;

  border-radius: var(--rs-border-radius-sm);
  border: var(--rs-border);
}
</style>

<style lang="scss">
.select-viewport {
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  position: relative;
}

.select-item {
  display: flex;
  align-items: center;
  height: 25px;

  position: relative;
}

.select-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 250px;

  font-weight: var(--rs-font-weight-light);
  color: rgb(var(--rs-color-text--secondary));
  text-align: center;
}

.clear-icon {
  width: 15px;
  height: 15px;
}
</style>
