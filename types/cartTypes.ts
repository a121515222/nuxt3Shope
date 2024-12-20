import type { productCartType } from "./productTypes";

export interface Cart {
  _id: string;
  userId: string;
  sellerId: string;
  totalPrice: number;
  isUsedCoupon: boolean;
  discountPriceWhitCoupon: number;
  productList: productCartType[];
}

export interface FetchCartData {
  data: Cart[];
  status: boolean;
  message: string;
}
