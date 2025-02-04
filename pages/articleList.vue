<script lang="ts" setup>
import type { FetchArticlesData } from "@/types/articleTypes";
import type { SearchBarEmitInfo } from "@/types/searchBarTypes";
import { searchArticles } from "@/apis/articles";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const articleStore = useArticleStore();
const { articleDataList, articlePagination } = storeToRefs(articleStore);
const { data } = await useAsyncData("searchArticle", () => {
  return searchArticles();
});
if (data.value?.status && process.server) {
  articleDataList.value = data.value.data.articles;
  articlePagination.value = data.value.data.pagination;
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
    const res = await searchArticles(currentSearchData.value.searchInfo, page);
    articleDataList.value = res.data.articles;
    articlePagination.value = res.data.pagination;
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
