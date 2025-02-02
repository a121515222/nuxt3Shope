import type { Pagination } from "@/types/paginationTypes";
import { defineStore } from "pinia";
// import { type Product } from "@/types/productTypes";
import type { AdminProduct } from "@/types/adminProductTypes";
export const useProductStore = defineStore("product", () => {
  const productDataList = ref<AdminProduct[]>([]);
  const productPaginationData = ref<Pagination>();
  return {
    productDataList,
    productPaginationData
  };
});
