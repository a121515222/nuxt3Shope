import type { Pagination } from "@/types/paginationTypes";
export interface AdminArticle {
  userId: string;
  author: string;
  articleDate: number | Date;
  updatedAt?: number | Date;
  description: string;
  _id: string;
  imageUrl: string;
  isPublic: boolean;
  tag: string[];
  title: string;
  content: string;
}
export interface AdminSignalArticleShowInModal {
  success: boolean;
  article: AdminArticle;
}
export interface AdminArticleResponse {
  message: string;
  status: boolean;
  data: AdminArticle;
}

export interface FetchAdminArticle {
  status: boolean;
  data: {
    articles: AdminArticle[];
    pagination: Pagination;
  };
  messages: string;
}
