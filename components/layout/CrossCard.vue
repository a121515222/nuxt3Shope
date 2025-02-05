<script lang="ts" setup>
import type { AdminProduct } from "@/types/adminProductTypes";
const props = defineProps<{
  cardProductsDataProps: AdminProduct[];
}>();
</script>
<template>
  <template v-for="(item, index) in props.cardProductsDataProps" :key="item.title + index">
    <div
      class="flex flex-col md:flex-row p-0 overflow-hidden md:max-h-[35vh] md:min-h-[35vh]"
      :class="index % 2 === 0 ? '' : 'md:flex-row-reverse'"
      v-if="index < 2"
    >
      <div class="w-full md:w-1/2">
        <ImageWithErrorHandler
          :alt="item.title"
          :src="item.imageUrl"
          :class="'w-full max-h-[50vh] min-h-[50vh] object-cover object-center'"
        ></ImageWithErrorHandler>
      </div>
      <div
        class="w-full md:w-1/2 flex flex-col justify-between p-4 dark:text-white bg-gray-200 dark:bg-gray-700"
      >
        <h3 class="text-2xl font-bold mb-2">{{ item.title }}</h3>
        <p class="line-clamp-3 mb-4" v-html="item.content"></p>
        <div v-if="item.discount === 0" class="flex gap-2 mb-4">
          <span>售價:{{ item.price }}元</span>
          <span>/{{ item.unit }}</span>
        </div>
        <div v-else class="flex gap-2 mb-4">
          <span class="line-through text-gray-500">原價{{ item.price ?? 0 }}元</span>
          <span class="text-red-500">特價{{ (item.price ?? 0) - (item.discount ?? 0) }}元</span>
          <span>/{{ item.unit }}</span>
        </div>
        <NuxtLink
          class="text-2xl text-center text-primary bg-secondary hover:bg-primary hover:text-secondary rounded-lg px-4 py-2 mt-4"
          :to="`/product/${item._id}`"
        >
          馬上購買
        </NuxtLink>
      </div>
    </div>
  </template>
</template>
<style></style>
