<template>
  <div class="footer">
    <p class="description">
      {{ hotel.description }}
    </p>

    <div class="rent-action">
      <Button variant="light">
        <template #icon>
          <Card />
        </template>

        Забронировать
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/shared/api/hotels";
import Card from "~icons/rs-icons/card";

import { Button } from "@/shared/ui/button";

defineProps<{ hotel: Hotel }>();
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  column-gap: 40px;
  row-gap: 15px;

  @media (min-width: $rs-breakpoint-lg) {
    flex-direction: row;
  }
}

.description {
  font-weight: var(--rs-font-weight-light);
}

.rent-action {
  align-self: flex-end;
}
</style>
