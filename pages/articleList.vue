<script lang="ts" setup>
useSeoMeta({
  title: "自種自售-文章列表",
  description: "上架自家農產品的店商網頁-文章列表(展示用)",
  ogTitle: "自種自售-文章列表",
  ogDescription: "上架自家農產品的店商望網頁-文章列表(展示用)",
  ogUrl: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}/articleList`,
  ogType: "website",
  ogLocale: "zh_TW",
  ogImage: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}/og-image.jpg`,
  ogImageType: "image/jpeg",
  ogImageWidth: "1200",
  ogImageHeight: "630"
});
import type { Article } from "@/types/articleTypes";
import type { Pagination } from "~/types/paginationTypes";
import type { SearchBarEmitInfo } from "@/types/searchBarTypes";
import { useFetchArticles } from "@/composables/useFetchArticle";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const articleDataList = useState<Article[]>("articleDataList", () => []);
const articlePagination = useState<Pagination>("articlePagination", () => {
  return {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    limit: 0,
    hasPrevPage: false,
    hasNextPage: false
  };
});
if (process.server) {
  const { articles, pagination } = await useFetchArticles();
  articleDataList.value = articles;
  articlePagination.value = pagination;
} else {
  // 客戶端邏輯，使用已經從 SSR 中獲取並存儲的資料
  if (articleDataList.value.length === 0) {
    // 如果頁面切換後資料尚未存在，可以重新請求
    const { articles, pagination } = await useFetchArticles();
    articleDataList.value = articles;
    articlePagination.value = pagination;
  }
}

const searchButtonConfig = {
  search: true,
  clearSearch: true,
  dateOldToNew: true,
  dateNewToOld: true
};
const currentSearchData = ref<SearchBarEmitInfo>({
  searchInfo: ""
});
const handleChangePage = async (page: number) => {
  await handleSearch(null, page);
};
const handleSearch = async (searchData?: SearchBarEmitInfo | null, page: number = 1) => {
  if (searchData) {
    const { searchInfo } = searchData;
    currentSearchData.value.searchInfo = searchInfo.trim();
  }
  try {
    isLoading.value = true;
    const { articles, pagination } = await useFetchArticles(
      currentSearchData.value.searchInfo,
      page
    );
    articleDataList.value = articles;
    articlePagination.value = pagination;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
const handleClearSearch = () => {
  currentSearchData.value.searchInfo = "";
};
const handleDateOldToNew = () => {
  articleDataList.value = articleDataList.value.sort((a, b) => {
    const timeA = isNaN(new Date(a.createdAt).getTime()) ? 0 : new Date(a.createdAt).getTime();
    const timeB = isNaN(new Date(b.createdAt).getTime()) ? 0 : new Date(b.createdAt).getTime();
    return timeA - timeB;
  });
};
const handleDateNewToOld = () => {
  articleDataList.value = articleDataList.value.sort((a, b) => {
    const timeA = isNaN(new Date(a.createdAt).getTime()) ? 0 : new Date(a.createdAt).getTime();
    const timeB = isNaN(new Date(b.createdAt).getTime()) ? 0 : new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
};
</script>
<template>
  <div class="min-h-screen">
    <SearchSearchbar
      :autoCompleteListProp="articleDataList"
      :searchButtonConfigProp="searchButtonConfig"
      @search="handleSearch"
      @clearSearch="handleClearSearch"
      @dateOldToNew="handleDateOldToNew"
      @dateNewToOld="handleDateNewToOld"
    ></SearchSearchbar>
    <div class="container mx-auto max-w-7xl">
      <ArticleCardList :articleListProp="articleDataList"></ArticleCardList>
      <Pagination :pagination="articlePagination" @changePage="handleChangePage" />
    </div>
  </div>
</template>
<style></style>
