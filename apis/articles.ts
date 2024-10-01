import { useBaseFetch } from "@/utils/fetch";
import { type FetchArticleData } from "~/types/articleTypes";
export function getArticle() {
  return useBaseFetch<FetchArticleData>("articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
