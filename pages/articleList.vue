<script lang="ts" setup>
import { type FetchArticlesData } from "@/types/articleTypes";
import { type SearchBarEmitInfo } from "@/types/searchBarTypes";
import { getArticles } from "@/apis/articles";
const articleStore = useArticleStore();
const { articleDataList } = storeToRefs(articleStore);
const { data } = await useAsyncData("getArticle", async () => {
  if (articleDataList.value.length === 0) {
    const res = await getArticles();
    return (res as FetchArticlesData).articles;
  }
});
if (data.value) {
  articleDataList.value = data.value;
}
const searchButtonConfig = {
  search: true,
  clearSearch: true,
  dateOldToNew: true,
  dateNewToOld: true
};

const handleSearch = (searchData: SearchBarEmitInfo) => {
  const { searchInfo } = searchData;
  showArticleList.value = articleDataList.value.filter((article) => {
    const matchSearchInfo =
      article.title.includes(searchInfo) ||
      article.tag?.includes(searchInfo) ||
      article.description.includes(searchInfo);
    return matchSearchInfo;
  });
  showArticleList.value = [...new Set(showArticleList.value)];
};
const handleClearSearch = () => {
  showArticleList.value = articleDataList.value;
};
const handleDateOldToNew = () => {
  showArticleList.value = showArticleList.value.sort((a, b) => a.create_at - b.create_at);
};
const handleDateNewToOld = () => {
  showArticleList.value = showArticleList.value.sort((a, b) => b.create_at - a.create_at);
};
const showArticleList = ref(articleDataList.value);
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
    <div class="container mx-auto">
      <ArticleCardList :articleListProp="showArticleList"></ArticleCardList>
    </div>
  </div>
</template>
<style></style>
