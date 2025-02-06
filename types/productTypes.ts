import type { Pagination } from "@/types/paginationTypes";

export interface Product {
  _id: string;
  userId: string;
  title: string;
  category: string[];
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  price: number | null;
  discount: number | null;
  unit: string;
  tag: string[];
  productStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  num: number | null;
  sellerInfo: {
    username: string;
    averageScore: number;
  };
}

export interface FetchProductsData {
  data: {
    articles: Product[];
    pagination: Pagination;
  };
  status: boolean;
  message: string;
}
export interface FetchProductData {
  data: Product;
  status: boolean;
  message: string;
}

export interface productCartType {
  productId: string;
  num: number;
  title: string;
  price: number;
  discount: number;
  imageUrl: string;
  productSellPrice: number;
  _id: string;
}
