import type { Pagination } from "@/types/paginationTypes";
import type { OrderCouponType } from "@/types/couponTypes";
import { orderStatusConfig, paidMethodConfig } from "@/utils/config";
export interface OrderProduct {
  discount: number; // 折扣數量，例如：90
  imageUrl: string; // 產品圖片的 URL，例如：https://www.google.com
  num: number; // 數量，例如：2
  price: number; // 原價，例如：100
  productId: string; // 產品 ID，例如："674ecd448d091f0024c8a70a"
  productSellPrice: number; // 售價，例如：90
  title: string; // 產品名稱，例如："orange"
  _id: string; // 唯一標識符，例如："676a59ae752d68bc1a3b5d46"
  unit: string; // 單位，例如："kg"
}
interface SellerInfo {
  email: string; // 電子郵件，例如："
  tel: string; // 電話，例如："0912345678"
  username: string; // 名稱，例如："seller"
}
interface BuyerInfo {
  address: string; // 地址，例如："台北市中正區"
  email: string; // 電子郵件，例如："
  tel: string; // 電話，例如："0912345678"
  username: string; // 名稱，例如："buyer"
  buyerMessage: string; // 買家留言，例如："請送到門口"
}
export interface BuyerOrder {
  _id: string; // 唯一標識符，例如："676a59ae752d68bc1a3b5d46"
  sellerId: string; // 賣家 ID，例如："674ecd448d091f0024c8a70a"
  sellerInfo: SellerInfo;
  buyerInfo: BuyerInfo;
  createdAt: string | number | Date; // 建立時間，例如："2021-09-01T07:00:00.000Z"
  paidDate: string | number | Date | null; // 付款時間，例如："2021-09-01T07:00:00.000Z"
  receiptDate: string | number | Date | null; // 收貨貨時間，例如："2021-09-01T07:00:00.000Z"
  productList: OrderProduct[];
  totalPrice: number; // 總價，例如：180
  status: keyof typeof orderStatusConfig | ""; // 狀態，
  isPaid: boolean; // 是否已付款，例如：true
  couponInfo: OrderCouponType;
  paidMethod: keyof typeof paidMethodConfig | ""; // 付款方式，例如："信用卡"
  commentInfo: {
    comment: string;
    score: number;
    commentId: string | null;
  };
}

export interface BuyerOrdersFetch {
  status: boolean;
  data: {
    pagination: Pagination;
    orderList: BuyerOrder[];
  };
  messages: string;
}
export interface BuyerOrderFetch {
  status: boolean;
  data: BuyerOrder;
  message: string;
}
export interface SellerOrder {
  _id: string; // 唯一標識符，例如："676a59ae752d68bc1a3b5d46"
  buyerId: string; // 買家 ID，例如："674ecd448d091f0024c8a70a"
  buyerInfo: BuyerInfo;
  createdAt: string | number | Date; // 建立時間，例如："2021-09-01T07:00:00.000Z"
  paidDate: string | number | Date | null; // 付款時間，例如："2021-09-01T07:00:00.000Z"
  receiptDate: string | number | Date | null; // 收貨貨時間，例如："2021-09-01T07:00:00.000Z"
  productList: OrderProduct[];
  totalPrice: number; // 總價，例如：180
  status: keyof typeof orderStatusConfig; // 狀態，
  isPaid: boolean; // 是否已付款，例如：true
  couponInfo: OrderCouponType;
  paidMethod: keyof typeof paidMethodConfig; // 付款方式，例如："信用卡"
}
export interface SellerOrderFetch {
  status: boolean;
  data: {
    pagination: Pagination;
    orderList: SellerOrder[];
  };
  message: string;
}
export interface BuyerAddOrderResponse {
  status: boolean;
  data: {
    _id: string;
  };
  message: string;
}
