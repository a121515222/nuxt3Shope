import { useBaseFetch } from "@/utils/fetch";
import { type FetchProductData } from "~/types/productTypes";
export function getProducts() {
  return useBaseFetch<FetchProductData>("products/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
