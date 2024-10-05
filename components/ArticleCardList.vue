<script lang="ts" setup>
import { type Article } from "@/types/articleTypes";
interface ArticleCardListProps {
  articleListProp: Article[];
  articleIdProp?: string;
}
const props = withDefaults(defineProps<ArticleCardListProps>(), {
  articleListProp: (): Article[] => [],
  articleIdProp: ""
});
</script>
<template>
  <div class="flex flex-wrap mb-3">
    <template v-if="props.articleListProp.length > 0">
      <template v-for="(item, index) in props.articleListProp" :key="item.id + index">
        <div class="w-full sm:w-1/2 px-2 mb-3">
          <div class="shadow-lg hover:shadow-xl rounded-lg overflow-hidden mt-3">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3">
                <img
                  class="object-cover w-full h-full"
                  style="min-height: 300px; max-height: 300px"
                  :src="item.image"
                  :alt="item.title"
                />
              </div>
              <div
                class="md:w-2/3 flex flex-col justify-center p-4 bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                <div class="card-body">
                  <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                  <p class="text-gray-500 dark:text-gray-300">
                    公布日期: {{ formatTimestamp(item.create_at) }}
                  </p>
                  <p class="line-clamp-3">{{ item.description }}</p>
                </div>
                <div class="mt-auto flex justify-end">
                  <NuxtLink
                    class="btn bg-primary hover:bg-blue-600 text-secondary py-2 px-4 rounded"
                    :to="`/article/${item.id}`"
                  >
                    詳細內容
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <h2 class="text-2xl">找不到東西喔</h2>
    </template>
  </div>
</template>
<style></style>
