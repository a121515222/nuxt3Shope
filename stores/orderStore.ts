import { defineStore } from "pinia";

export const useOrderStore = defineStore("userOrder", () => {
  const isFinishedPayment = ref(false);
  return {
    isFinishedPayment
  };
});
