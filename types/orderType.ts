import type { Pagination } from "@/types/paginationTypes";
import type { UsedCoupon } from "@/types/couponTypes";
export interface FetchOrdersData {
  success: boolean;
  pagination: Pagination;
  messages: string[];
  orders: Order[];
}
export interface FetchOrderData {
  success: boolean;
  pagination: Pagination;
  messages: string[];
  order: Order;
}

export interface Order {
  id: string;
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  message?: string;
  products: OrderProduct;
  total: number;
  is_paid: boolean;
  paid_date?: number;
  create_at?: number;
  num: number;
  coupon: UsedCoupon;
}
export interface OrderProduct {
  [key: string]: {
    id: string;
    product_id: string;
    qty: number;
    total: number;
    final_total: number;
    product: {
      id: string;
      title: string;
      category: string;
      content: string;
      description: string;
      imageUrl: string;
      imagesUrl: string[];
      origin_price: number;
      price: number;
      unit: string;
      is_enabled: number;
    };
  };
}
export interface OrderUserInfo {
  name: string;
  email: string;
  tel: string;
  address: string;
  message: string;
}

export interface PostOrderResponse {
  success: boolean;
  message: string;
  total: number;
  orderId: string;
  create_at: number;
}
//  "success": true,
//     "message": "已建立訂單",
//     "total": 145,
//     "orderId": "-OAbRJCXp9fg8dE9fIi8",
//     "create_at": 1730459812
