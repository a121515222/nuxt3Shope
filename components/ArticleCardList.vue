<script lang="ts" setup>
import type { Article } from "@/types/articleTypes";
interface ArticleCardListProps {
  articleListProp: Article[];
  articleIdProp?: string;
}
const props = withDefaults(defineProps<ArticleCardListProps>(), {
  articleListProp: () => [] as Article[],
  articleIdProp: ""
});
</script>
<template>
  <div class="flex flex-wrap mb-3">
    <template v-if="props.articleListProp.length > 0">
      <template v-for="(item, index) in props.articleListProp" :key="item._id + index">
        <div class="w-full sm:w-1/2 px-2 mb-3">
          <div class="shadow-lg hover:shadow-xl rounded-lg overflow-hidden mt-3">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3">
                <ImageWithErrorHandler
                  :alt="item.title"
                  :src="item.imageUrl"
                  :class="'w-full h-52 object-cover rounded-t-md'"
                ></ImageWithErrorHandler>
              </div>
              <div
                class="md:w-2/3 flex flex-col justify-center p-4 bg-gray-200 dark:bg-gray-700 dark:text-white"
              >
                <div class="card-body">
                  <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                  <p class="text-gray-500 dark:text-gray-300">
                    公布日期:
                    <span v-timeFormat="item.articleDate"></span>
                  </p>
                  <p class="line-clamp-3">{{ item.description }}</p>
                </div>
                <div class="mt-auto flex justify-end">
                  <NuxtLink
                    class="btn bg-primary hover:bg-secondary text-secondary hover:text-primary py-2 px-4 rounded"
                    :to="`/article/${item._id}`"
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
