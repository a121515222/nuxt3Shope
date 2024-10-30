import type { Pagination } from "@/types/paginationTypes";
export interface AdminOrder {
  id: string;
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  message?: string;
  products: AdminOrderProduct;
  total: number;
  is_paid: boolean;
  paid_date?: number;
  create_at?: number;
  num: number;
}
export interface AdminOrderProduct {
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
export interface FetchAdminOrder {
  success: boolean;
  orders: AdminOrder[];
  pagination: Pagination;
  messages: string[];
}
export interface AdminOrderResponse {
  success: boolean;
  message: string;
}
