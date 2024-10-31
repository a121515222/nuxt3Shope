import { useBaseFetch } from "@/utils/fetch";
import type { FetchOrdersData, FetchOrderData } from "@/types/orderType";

export function getOrdersData(page: number = 1) {
  return useBaseFetch<FetchOrdersData>(`orders?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function getOrderData(id: string) {
  return useBaseFetch<FetchOrderData>(`order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
