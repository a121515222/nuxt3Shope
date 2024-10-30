import { useBaseFetch } from "@/utils/fetch";
import type { AdminCoupon, FetchAdminCoupon, AdminCouponResponse } from "@/types/adminCouponTypes";

export function getAdminCoupons(page: number = 1) {
  const api_token = getCookie("token");
  return useBaseFetch<FetchAdminCoupon>(`admin/coupons?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
export function postAdminCoupon(info: AdminCoupon) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminCouponResponse>("admin/coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}
export function putAdminCoupon(info: AdminCoupon) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminCouponResponse>(`admin/coupon/${info.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}
export function deleteAdminCoupon(id: string) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminCouponResponse>(`admin/coupon/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
