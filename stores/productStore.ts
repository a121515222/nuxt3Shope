import { defineStore } from "pinia";
import { type Product } from "@/types/productTypes";
export const useProductStore = defineStore("product", () => {
  const productDataList = ref<Product[]>([]);
  return {
    productDataList
  };
});
