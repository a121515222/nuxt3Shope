export interface Article {
  author?: string;
  id: string;
  create_at: number;
  title: string;
  description: string;
  image: string;
  isPublic: boolean;
  tag?: string[];
  num: number;
}

export interface FetchArticlesData {
  articles: Article[];
  success: boolean;
}
// 文章列表資料type與單筆文章資料type不一樣，先分開寫
export interface ArticleSingle {
  author: string;
  content: string;
  create_at: number; // UNIX 时间戳
  description: string;
  id: string;
  image: string;
  isPublic: boolean;
  tag: string[]; // 标签数组
  title: string;
}

export interface FetchArticleData {
  article: ArticleSingle;
  success: boolean;
}
