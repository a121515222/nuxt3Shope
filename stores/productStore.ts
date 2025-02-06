import type { Pagination } from "@/types/paginationTypes";
import { defineStore } from "pinia";
import type { Product } from "@/types/productTypes";
export const useProductStore = defineStore("product", () => {
  const productDataList = ref<Product[]>([]);
  const indexProductDataList = ref<Product[]>([]);
  const specialProductDataList = ref<Product[]>([]);
  const productPaginationData = ref<Pagination>();
  return {
    productDataList,
    indexProductDataList,
    specialProductDataList,
    productPaginationData
  };
});
