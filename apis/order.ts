import { useBaseFetch } from "@/utils/fetch";
import type {
  FetchOrdersData,
  FetchOrderData,
  OrderUserInfo,
  PostOrderResponse
} from "@/types/orderType";

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
// #todo 改用自己的後端時調整送出的資料格式
export function postOrderData(userInfo: OrderUserInfo) {
  return useBaseFetch<PostOrderResponse>(`order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: {
        user: {
          address: userInfo.address,
          email: userInfo.email,
          name: userInfo.name,
          tel: userInfo.tel
        },
        message: userInfo.message
      }
    })
  });
}
