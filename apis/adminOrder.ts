import type {
  BuyerOrderFetch,
  SellerOrderFetch,
  BuyerAddOrderResponse
} from "@/types/adminOrderTypes";
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

export function getBuyerOrder(id: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerOrderFetch>(
    `buyerGetOrder/${id}`,
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

export function putSellerOderStatus(orderId: string, status: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<SellerOrderFetch>(
    `sellerEditOrder`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ status, orderId })
    },
    "newClient"
  );
}

interface BuyerInfoType {
  address: string;
  email: string;
  tel: string;
  username: string;
  cartId: string;
  sellerId: string;
}

export function buyerAddOrder(data: any) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerAddOrderResponse>(
    `buyerAddOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify(data)
    },
    "newClient"
  );
}
