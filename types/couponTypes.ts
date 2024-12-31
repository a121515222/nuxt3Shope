import type { FetchCartData } from "@/types/cartTypes";

export interface Coupon {
  code: string;
}
export interface CouponResponse extends FetchCartData {}
// #todo is_enabled should be boolean
export interface UsedCoupon {
  code: string;
  due_date: number;
  id: string;
  is_enabled: number;
  percent: number;
  title: string;
}

export interface OrderCouponType {
  code: string;
  discount: number;
  title: string;
  expireDate: string | number | Date | null;
  couponId: string;
}
