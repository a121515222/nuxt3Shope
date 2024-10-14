export interface Coupon {
  code: string;
}
export interface CouponResponse {
  success: boolean;
  message: string;
  data: { final_total: number };
}
