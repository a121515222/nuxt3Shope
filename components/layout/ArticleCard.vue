<script lang="ts" setup>
import { type Article } from "@/types/articleTypes";
interface ArticleCardProps {
  articleDataProps: Article[];
  articleDataConfig: {
    isMainArticle: boolean;
  };
}
const props = withDefaults(defineProps<ArticleCardProps>(), {
  articleDataProps: (): Article[] => [],
  articleDataConfig: () => ({
    isMainArticle: false
  })
});
</script>
<template>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <div v-for="(item, index) in props.articleDataProps" :key="item.id" class="w-full">
      <div v-if="props.articleDataConfig.isMainArticle ? index <= 3 : index >= 0" class="w-full">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 dark:text-white bg-gray-200 dark:bg-gray-700"
        >
          <img class="w-full h-48 object-cover" :alt="item.title" :src="item.image" />
          <div class="p-4 dark:text-white bg-gray-200 dark:bg-gray-700">
            <h3 class="text-2xl font-bold mb-2">{{ item.title }}</h3>
            <p class="line-clamp-2">{{ item.description }}</p>
          </div>
          <div
            class="border-t border-gray-300 dark:border-gray-500 p-4 text-center dark:text-white bg-gray-200 dark:bg-gray-700"
          >
            <NuxtLink
              class="btn btn-primary text-primary bg-secondary hover:bg-primary hover:text-secondary px-4 py-2 rounded-lg"
              :to="`/article/${item.id}`"
            >
              詳細資訊
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
