import type { productCartType } from "./productTypes";
import type { OrderCouponType } from "@/types/couponTypes";
export interface Cart {
  _id: string;
  userId: string;
  sellerId: string;
  totalPrice: number;
  productList: productCartType[];
  couponInfo: OrderCouponType;
}

export interface FetchCartData {
  data: Cart[];
  status: boolean;
  message: string;
}
