import { useBaseFetch } from "@/utils/fetch";
import type { AdminCoupon, FetchAdminCoupon, AdminCouponResponse } from "@/types/adminCouponTypes";

export function getAdminCoupons(page: number | string = 1, limit: number | string = 10) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchAdminCoupon>(
    `coupons?page=${page}?limit=${limit}`,
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

export function editAdminCoupon(info: AdminCoupon) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminCouponResponse>(
    `coupon/${info._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...info })
    },
    "newClient"
  );
}

export function createCoupon(info: AdminCoupon) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminCouponResponse>(
    "coupon",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...info })
    },
    "newClient"
  );
}
export function deleteAdminCoupon(id: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminCouponResponse>(
    `coupon/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "newClient"
  );
}
