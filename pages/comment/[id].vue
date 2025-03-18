<script lang="ts" setup>
import { getComment } from "@/apis/commentAPI";
const route = useRoute();
interface Comment {
  _id: string;
  commenterName: string;
  createdAt: string;
  score: number;
  comment: string;
  productList: { productId: string; title: string; imageUrl: string }[];
}

const commentList = ref<Comment[]>([]);
const pagination = ref();

const handleChangePage = async (page: number) => {
  const res = await getComment(route.params.id as string, page);
  if (res.status) {
    commentList.value = res.data.comments;
    pagination.value = res.data.pagination;
  }
};

const scrollContainers = ref<HTMLElement[] | null[]>([]);
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let activeIndex: number | null = null;

const startDrag = (event: MouseEvent, index: number) => {
  if (!scrollContainers.value[index]) return;
  isDragging = true;
  activeIndex = index;
  startX = event.pageX;
  scrollLeft = scrollContainers.value[index].scrollLeft;
};

const onDrag = (event: MouseEvent, index: number) => {
  if (!isDragging || activeIndex !== index || !scrollContainers.value[index]) return;
  event.preventDefault();
  const walk = (event.pageX - startX) * 1.5; // 控制滑動速度
  scrollContainers.value[index].scrollLeft = scrollLeft - walk;
};

const endDrag = () => {
  isDragging = false;
  activeIndex = null;
};

onMounted(async () => {
  if (!route.params.id) {
    return;
  } else {
    const res = await getComment(
      Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    );
    if (res.status) {
      commentList.value = res.data.comments;
      pagination.value = res.data.pagination;
    }
  }
});
</script>
<template>
  <div class="container mx-auto max-w-7xl">
    <h2 class="text-2xl font-bold mb-4 dark:text-white px-2">賣家評論</h2>
    <div class="my-4 space-y-4">
      <div
        v-for="(comment, index) in commentList"
        :key="comment._id"
        class="bg-gray-200 dark:bg-gray-600 dark:text-white shadow-md p-6 rounded-lg mx-2"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="dark:text-white text-lg font-semibold">{{ comment.commenterName }}</h3>
          <span
            class="text-gray-500 dark:text-gray-300 text-sm"
            v-timeFormat="comment.createdAt"
          ></span>
        </div>
        <div class="flex items-center mt-2">
          <span v-for="i in comment.score">
            <svg
              class="w-6 h-6 text-yellow-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
          </span>
          <span v-for="i in 5 - comment.score">
            <svg
              class="w-6 h-6 text-gray-400 dark:text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
              />
            </svg>
          </span>
          <!-- <span class="text-yellow-500">⭐️</span> <span class="ml-1">{{ comment.score }}</span> -->
        </div>
        <p class="dark:text-white">{{ comment.comment }}</p>

        <div v-if="comment.productList.length" class="mt-4">
          <h4 class="text-md font-semibold mb-2">購買商品：</h4>
          <div
            class="flex space-x-2 no-scrollbar overflow-x-auto flex-nowrap"
            ref="scrollContainers"
            @mousedown="startDrag($event, index)"
            @mousemove="onDrag($event, index)"
            @mouseup="endDrag"
            @mouseleave="endDrag"
          >
            <NuxtLink
              v-for="product in comment.productList"
              :key="product.productId"
              class="rounded-lg overflow-hidden shadow-sm min-w-[200px]"
              :to="`/product/${product.productId}`"
            >
              <ImageWithErrorHandler
                :alt="product.title"
                :src="product.imageUrl"
                :class="'w-full min-w-[200px] max-w-[200px] h-32 object-cover '"
              ></ImageWithErrorHandler>
              <div class="p-2 text-center bg-primary dark:bg-secondary">
                <p class="text-sm font-medium text-secondary dark:text-primary">
                  {{ product.title }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @changePage="handleChangePage" />
  </div>
</template>
<style></style>
