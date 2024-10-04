import { useBaseFetch } from "@/utils/fetch";
import { type FetchArticlesData } from "~/types/articleTypes";
export function getArticle() {
  return useBaseFetch<FetchArticlesData>("articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
