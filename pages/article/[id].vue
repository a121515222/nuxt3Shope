<script lang="ts" setup>
import { type ArticleSingle } from "@/types/articleTypes";
import { getArticle } from "@/apis/articles";
const article = ref<ArticleSingle>({
  author: "",
  content: "",
  create_at: 0,
  id: "",
  title: "",
  description: "",
  image: "",
  isPublic: true,
  tag: []
});
onMounted(async () => {
  const route = useRoute();
  if (!route.params.id) {
    return;
  } else {
    const res = await getArticle(route.params.id as string);
    article.value = res?.article || {
      author: "",
      content: "",
      create_at: 0,
      id: "",
      title: "",
      description: "",
      image: "",
      isPublic: true,
      tag: []
    };
  }
});
</script>
<template>
  <div class="container pt-10 mx-auto">
    <div
      class="flex flex-col lg:flex-row my-3 bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white"
    >
      <div
        class="w-full lg:w-1/2 px-0 rounded-lg overflow-hidden"
        style="min-height: 45vh; max-height: 45vh"
      >
        <img
          class="w-full h-full object-cover rounded-lg"
          :src="article.image"
          :alt="article.title + ' picture'"
        />
      </div>
      <div class="w-full lg:w-1/2 mt-3 px-4">
        <h2 class="font-bold text-2xl mb-2">{{ article.title }}</h2>
        <p class="text-xl mb-2">作者: {{ article.author }}</p>
        <p class="text-xl mb-2">發布時間: {{ formatTimestamp(article.create_at || 0) }}</p>
        <p class="mb-2" v-html="article.content"></p>
      </div>
    </div>
  </div>
</template>
<style></style>
