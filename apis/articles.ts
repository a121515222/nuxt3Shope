import { useBaseFetch } from "@/utils/fetch";
import { type FetchArticlesData } from "~/types/articleTypes";
export function getArticles() {
  return useBaseFetch<FetchArticlesData>("articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
