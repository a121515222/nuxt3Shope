import type { Pagination } from "@/types/paginationTypes";
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
