import type { Pagination } from "@/types/paginationTypes";
export interface AdminCoupon {
  title: string;
  userId: string;
  code: string;
  discount: number;
  expireDate: Date | string | number;
  isPublic: boolean;
  couponNum: number;
  _id: string;
}
export interface FetchAdminCoupon {
  status: boolean;
  data: {
    coupons: AdminCoupon[];
    pagination: Pagination;
  };
  messages: string;
}
export interface AdminCouponResponse {
  message: string;
  status: boolean;
}
