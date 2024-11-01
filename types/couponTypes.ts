export interface Coupon {
  code: string;
}
export interface CouponResponse {
  success: boolean;
  message: string;
  data: { final_total: number };
}
// #todo is_enabled should be boolean
export interface UsedCoupon {
  code: string;
  due_date: number;
  id: string;
  is_enabled: number;
  percent: number;
  title: string;
}
