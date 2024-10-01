import { defineStore } from "pinia";
import { type Article } from "@/types/articleTypes";
export const useArticleStore = defineStore("articleStore", () => {
  const articleDataList = ref<Article[]>([]);
  return {
    articleDataList
  };
});
