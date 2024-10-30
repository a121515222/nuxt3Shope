import { useBaseFetch } from "@/utils/fetch";
import type { AdminOrder, AdminOrderProduct, FetchAdminOrder } from "@/types/adminOrderTypes";
export function getAdminOrders(page: number = 1) {
  const api_token = getCookie("token");
  return useBaseFetch<FetchAdminOrder>(`admin/orders?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
