import { useBaseFetch } from "@/utils/fetch";
import { type FetchArticleData, type FetchArticlesData } from "~/types/articleTypes";
export function getArticles() {
  return useBaseFetch<FetchArticlesData>("articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function getArticle(id: string) {
  return useBaseFetch<FetchArticleData>(`article/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
