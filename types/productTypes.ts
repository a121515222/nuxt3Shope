export interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl?: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface FetchProductsData {
  products: Product[];
  success: boolean;
}
export interface FetchProductData {
  product: Product;
  success: boolean;
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
