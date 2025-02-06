import { useBaseFetch } from "@/utils/fetch";
import type { FetchProductsData, FetchProductData } from "@/types/productTypes";
export function searchProducts(
  keyWork: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice: number | null = null,
  maxPrice: number | null = null
) {
  return useBaseFetch<FetchProductsData>(
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

export function getProductById(id: string) {
  return useBaseFetch<FetchProductData>(
    `productById/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    "newClient"
  );
}
