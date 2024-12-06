import type { Pagination } from "@/types/paginationTypes";
export interface AdminProduct {
  _id: string; // 對應到 API 的 id
  userId: string; // 用戶 ID
  title: string; // 商品名稱
  category: string[]; // 商品類別
  content: string; // 商品內容描述
  description: string; // 商品簡短描述
  imageUrl: string; // 單張主要圖片
  imagesUrl: string[]; // 多張圖片 URL
  price: number | null; // 商品價格
  discount: number | null; // 折扣百分比
  unit: string; // 單位
  tag: string[]; // 標籤
  productStatus: number; // 商品狀態
  createdAt: string | Date; // 創建時間
  updatedAt: string | Date; // 更新時間
  num: number | null; // 商品數量
}
export interface FetchAdminProduct {
  message: string; // 返回訊息
  status: boolean; // 查詢是否成功
  data: {
    products: AdminProduct[]; // 商品列表
    pagination: Pagination; // 分頁數據
  };
}
// export interface AdminProduct {
//   id: string;
//   title: string;
//   category: string;
//   content: string;
//   description: string;
//   imageUrl: string;
//   is_enabled: number;
//   origin_price: number;
//   price: number;
//   unit: string;
//   num: number;
//   imagesUrl?: string[];
// }

// export interface FetchAdminProduct {
//   messages: string[];
//   pagination: Pagination;
//   products: AdminProduct[];
//   success: boolean;
// }

export interface AdminProductResponse {
  message: string;
  status: boolean;
  data: AdminProduct;
}
