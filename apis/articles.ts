import { useBaseFetch } from "@/utils/fetch";
import type { FetchArticleData, FetchArticlesData } from "@/types/articleTypes";

export function searchArticles(keyWork: string = "", page: number = 1, limit: number = 10) {
  return useBaseFetch<FetchArticlesData>(
    `searchArticles?search=${keyWork}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    "newClient"
  );
}
