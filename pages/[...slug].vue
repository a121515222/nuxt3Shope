<script lang="ts" setup>
const indexStore = useIndexStore();
const { headerHeight, footerHeight, windowHeight } = storeToRefs(indexStore);
const route = useRoute();
const event = useRequestEvent();
setResponseStatus(404);
</script>
<template>
  <div
    class="flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4"
    :style="`min-height: ${windowHeight - footerHeight - headerHeight}px`"
  >
    <div class="max-w-2xl w-full text-center space-y-8">
      <!-- 404 Text -->
      <h1
        class="text-9xl font-extrabold text-gray-800 dark:text-gray-100 drop-shadow-md animate-pulse"
      >
        404
      </h1>

      <!-- Error Message -->
      <div class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-700 dark:text-gray-200">糟糕！找不到頁面</h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          抱歉，您要尋找的頁面可能已被移除或暫時無法使用。
        </p>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回上一頁
        </button>

        <!-- Home Button -->
        <NuxtLink
          to="/"
          class="px-6 py-3 bg-primary text-white hover:text-secondary hover:opacity-80 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          返回首頁
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style></style>
