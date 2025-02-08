import { searchArticles } from "@/apis/articles";
export const useFetchArticles = async (
  keyWords: string = "",
  page: number = 1,
  limit: number = 10
) => {
  const { data } = await useAsyncData("searchArticle", () => searchArticles(keyWords, page, limit));
  if (data.value?.status) {
    return {
      articles: data.value.data.articles,
      pagination: data.value.data.pagination
    };
  }
  return {
    articles: [],
    pagination: {
      currentPage: 1,
      totalCount: 0,
      totalPages: 0,
      limit: 0,
      hasPrevPage: false,
      hasNextPage: false
    }
  };
};
