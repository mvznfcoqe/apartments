<template>
  <button
    class="button"
    :class="[
      `button_variant-${variant}`,
      `button_color-${color}`,
      `button_size-${size}`,
    ]"
  >
    <span class="icon">
      <slot name="icon" />
    </span>

    <span class="text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "filled" | "light" | "outlined";
    color?: "primary" | "success";
    size?: "md" | "lg";
  }>(),
  { size: "md", color: "primary", variant: "filled" },
);
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &_size-md {
    padding: 10px 30px;

    font-weight: var(--rs-font-weight-light);
    font-size: 14px;
    border-radius: var(--rs-border-radius-md);
  }

  &_size-lg {
    padding: 18px 60px;

    font-weight: var(--rs-font-weight-bold);
    font-size: 16px;
    border-radius: var(--rs-border-radius-lg);
  }

  &_variant-outlined {
    border: var(--rs-border);
  }

  &_variant-light.button_color-primary {
    color: rgb(var(--rs-color-primary));
    background-color: rgba(
      var(--rs-color-primary),
      var(--rs-button-light-opacity)
    );
  }

  &_variant-light.button_color-success {
    color: rgb(var(--rs-color-success));
    background-color: rgba(
      var(--rs-color-success),
      var(--rs-button-light-opacity)
    );
  }

  &_variant-filled.button_color-primary {
    color: rgb(var(--rs-button-filled-text-light));
    background-color: rgb(var(--rs-color-primary));
  }
}

.icon {
  display: flex;
  align-items: center;

  height: fit-content;

  &:empty {
    display: none;
  }
}
</style>
