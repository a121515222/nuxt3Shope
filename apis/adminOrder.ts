import type {
  BuyerOrderFetch,
  BuyerOrdersFetch,
  SellerOrderFetch,
  BuyerAddOrderResponse
} from "@/types/adminOrderTypes";
import { useBaseFetch } from "@/utils/fetch";

export function getBuyerOrdersData(page: number = 1, limit: number = 10) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerOrdersFetch>(
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

interface PutBuyerInfo {
  orderId: string;
  address: string;
  tel: string;
  buyerMessage: string;
}
export function putBuyerOrder(putBuyInfo: PutBuyerInfo) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerOrderFetch>(
    `buyerEditOrder`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify(putBuyInfo)
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

export function buyerPayOrder(orderId: string, paidMethod: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerAddOrderResponse>(
    `buyerPayOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ orderId, paidMethod })
    },
    "newClient"
  );
}

export function buyerCancelOrder(orderId: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerAddOrderResponse>(
    `buyerCancelOrder`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ orderId })
    },
    "newClient"
  );
}
export function buyerGotProduct(orderId: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<BuyerAddOrderResponse>(
    `buyerGotProduct`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ orderId })
    },
    "newClient"
  );
}
