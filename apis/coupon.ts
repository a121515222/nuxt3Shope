import { useBaseFetch } from "@/utils/fetch";
import { type Coupon, type CouponResponse } from "@/types/couponTypes";
export function postCoupon(data: Coupon) {
  return useBaseFetch<CouponResponse>("coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data })
  });
}
