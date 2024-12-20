import { useBaseFetch } from "@/utils/fetch";
import type { CouponResponse } from "@/types/couponTypes";
export function useCoupon(coupon: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<CouponResponse>(
    "cartUsedCoupon",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ coupon })
    },
    "newClient"
  );
}
