<template>
  <div class="header">
    <div class="summary">
      <h2 class="name">
        {{ hotel.name }}
      </h2>

      <div class="details">
        <Stars :model-value="hotel.stars" />

        <div class="details-list">
          <span>{{ hotel.type }}</span>

          •

          <span>
            <template v-if="hotel.reviews_amount">
              {{ hotel.reviews_amount }}
            </template>

            {{ reviewsText }}
          </span>
        </div>

        <span class="location">
          <Pin />

          {{ hotel.country }}
        </span>
      </div>
    </div>

    <div class="price">
      {{ minPrice }}

      <span class="rent-type">Цена за 1 ночь</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";
import { getPluralForm } from "@/shared/lib/plural-rules/ru";
import { Stars } from "@/shared/ui/stars";
import { computed } from "vue";

import Pin from "~icons/rs-icons/pin";

const props = defineProps<{ hotel: Hotel }>();

const minPrice = computed(() => {
  const parser = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  return parser.format(props.hotel.min_price);
});

const reviewsText = computed(() => {
  return getPluralForm({
    number: props.hotel.reviews_amount,
    forms: ["нет отзывов", "отзыв", "отзыва", "отзывов"],
  });
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  column-gap: 40px;
  row-gap: 10px;

  @media (min-width: $rs-breakpoint-sm) {
    flex-direction: row;
  }
}

.summary {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.name {
  font-size: 20px;
  font-weight: var(--rs-font-weight-bold);
}

.details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;

  font-size: 14px;
}

.details-list {
  display: flex;
  gap: 6px;

  color: rgb(var(--rs-color-text--secondary));
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 18px;
  font-weight: var(--rs-font-weight-bold);

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (min-width: $rs-breakpoint-sm) {
    font-size: 25px;
  }
}

.rent-type {
  color: rgb(var(--rs-color-text--secondary));
  font-weight: var(--rs-font-weight-light);
  font-size: 12px;
}
</style>
