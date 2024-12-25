import type { BuyerOrderFetch, SellerOrderFetch } from "@/types/adminOrderTypes";
import { useBaseFetch } from "@/utils/fetch";

export function getBuyerOrdersData(page: number = 1, limit: number = 10) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerOrderFetch>(
    `buyerGetOrderList?page=${page}?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "newClient"
  );
}

export function getSellerOrdersData(page: number = 1, limit: number = 10) {
  const api_token = getCookie("authorization");
  return useBaseFetch<SellerOrderFetch>(
    `sellerGetOrderList?page=${page}?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "newClient"
  );
}
