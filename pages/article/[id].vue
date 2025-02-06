<script lang="ts" setup>
import type { Article } from "@/types/articleTypes";
import { getUserArticleById } from "@/apis/adminArticle";
const article = ref<Article>({
  author: "",
  content: "",
  createdAt: "",
  _id: "",
  title: "",
  description: "",
  imageUrl: "",
  isPublic: true,
  tag: [],
  userId: "",
  updatedAt: "",
  articleDate: ""
});
onMounted(async () => {
  const route = useRoute();
  if (!route.params.id) {
    return;
  } else {
    const res = await getUserArticleById(route.params.id as string);
    article.value = res.data;
  }
});
</script>
<template>
  <div class="container pt-10 mx-auto max-w-7xl">
    <div
      class="flex flex-col lg:flex-row my-3 bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white"
    >
      <div
        class="w-full lg:w-1/2 px-0 rounded-lg overflow-hidden"
        style="min-height: 45vh; max-height: 45vh"
      >
        <ImageWithErrorHandler
          :alt="article.title"
          :src="article.imageUrl"
          :class="'w-full h-full object-cover rounded-t-md'"
        ></ImageWithErrorHandler>
      </div>
      <div class="w-full lg:w-1/2 mt-3 px-4">
        <h2 class="font-bold text-2xl mb-2">{{ article.title }}</h2>
        <p class="text-xl mb-2">作者: {{ article.author }}</p>
        <p class="text-xl mb-2">發布時間:<span v-timeFormat="article.articleDate"></span></p>
        <div class="mb-2" v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>
<style></style>
