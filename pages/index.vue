<script lang="ts" setup>
const indexStore = useIndexStore();
const { testData, isDarkMode } = storeToRefs(indexStore);
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>
<template>
  <div class="container mx-auto">
    <div class="bg-slate-100 dark:bg-slate-800 min-h-screen">
      <h1>首頁</h1>
      <p>{{ testData }}</p>
      <h1 class="text-3xl font-bold underline text-red-700 dark:text-white">
        Hello world!
      </h1>
      <button
        type="button"
        @click="toggleDarkMode"
        class="text-red-500 dark:text-gray-300 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        switch theme
      </button>
    </div>
  </div>
</template>
<style></style>
n
