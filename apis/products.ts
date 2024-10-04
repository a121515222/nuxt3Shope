import { useBaseFetch } from "@/utils/fetch";
import { type FetchProductsData, type FetchProductData } from "~/types/productTypes";
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
