import type { Pagination } from "@/types/paginationTypes";

export interface Article {
  _id: string;
  userId: string;
  title: string;
  description: string;
  content: string;
  tag: string[];
  imageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  articleDate: string;
  isPublic: boolean;
}

export interface FetchArticlesData {
  data: {
    articles: Article[];
    pagination: Pagination;
  };
  status: boolean;
  message: string;
}
export interface FetchArticleData {
  data: Article;
  status: boolean;
  message: string;
}
// 文章列表資料type與單筆文章資料type不一樣，先分開寫
export interface ArticleSingle {
  author: string;
  content: string;
  create_at: number;
  description: string;
  id: string;
  image: string;
  isPublic: boolean;
  tag: string[];
  title: string;
}

export interface FetchArticleData {
  article: ArticleSingle;
  success: boolean;
}
