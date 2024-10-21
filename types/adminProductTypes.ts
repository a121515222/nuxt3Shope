export interface AdminProduct {
  id: string;
  title: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  unit: string;
  num: number;
  imagesUrl?: string[];
}

export interface FetchAdminProduct {
  messages: string[];
  pagination: {
    total_pages: number;
    current_page: number;
    has_pre: boolean;
    has_next: boolean;
    category: string;
  };
  products: AdminProduct[];
  success: boolean;
}

export interface AdminProductResponse {
  message: string;
  success: boolean;
}
