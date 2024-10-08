import { type Product } from "./productTypes";

export interface Cart {
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
}

export interface FetchCartData {
  data: {
    carts: Cart[];
    final_total: number;
    total: number;
  };
  success: boolean;
}
