import type { Pagination } from "@/types/paginationTypes";
export interface AdminArticle {
  author: string;
  create_at: number | Date;
  description: string;
  id: string;
  // #todo image重寫後端的時候改imageUrl
  image: string;
  isPublic: boolean;
  tag?: string[];
  title: string;
  content: string;
  // #todo num重寫後端的時候可以拿掉
  num: number;
}
export interface AdminSignalArticleShowInModal {
  success: boolean;
  article: AdminArticle;
}
export interface AdminArticleResponse {
  message: string;
  success: boolean;
}

export interface FetchAdminArticle {
  success: boolean;
  articles: AdminArticle[];
  pagination: Pagination;
  messages: string[];
}
