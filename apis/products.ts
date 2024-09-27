import { useBaseFetch } from "@/utils/fetch";

export function getProducts() {
  return useBaseFetch("products/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
