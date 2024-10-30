// #todo 要增加coupon的數量 couponAmount
export interface AdminCoupon {
  code: string;
  due_date: number | Date;
  id: string;
  is_enabled: number;
  isPublic?: boolean;
  percent: number;
  title: string;
  num: number;
  couponAmount?: number;
}
export interface FetchAdminCoupon {
  success: boolean;
  coupons: AdminCoupon[];
  pagination: {
    total_pages: number;
    current_page: number;
    has_pre: boolean;
    has_next: boolean;
  };
  messages: string[];
}
export interface AdminCouponResponse {
  message: string;
  success: boolean;
}
