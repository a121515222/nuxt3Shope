import type { Pagination } from "@/types/paginationTypes";
import type { Article } from "@/types/articleTypes";
import { defineStore } from "pinia";
export const useArticleStore = defineStore("articleStore", () => {
  const articleDataList = ref<Article[]>([]);
  const articlePagination = ref<Pagination>();
  return {
    articleDataList,
    articlePagination
  };
});
