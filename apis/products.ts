import { useBaseFetch } from "@/utils/fetch";
import type { FetchProductsData, FetchProductData } from "~/types/productTypes";
import type { FetchAdminProduct } from "@/types/adminProductTypes";
export function searchProducts(
  keyWork: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice: number | null = null,
  maxPrice: number | null = null
) {
  return useBaseFetch<FetchAdminProduct>(
    `searchProducts/?search=${keyWork}&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    "newClient"
  );
}

export function getProducts() {
  return useBaseFetch<FetchProductsData>("products/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function getProduct(id: string) {
  return useBaseFetch<FetchProductData>(`product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
