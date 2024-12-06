import { onMounted, ref } from "vue";

export const useIsTouchable = () => {
  const isTouchable = ref(false);

  onMounted(() => {
    isTouchable.value =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  return {
    isTouchable,
  };
};
