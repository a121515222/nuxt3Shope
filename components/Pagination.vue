<script lang="ts" setup>
const pagination = ref({
  total_pages: 15,
  current_page: 1,
  has_pre: false,
  has_next: true,
  category: ""
});
const showPaginationList = computed(() => {
  console.log("currentPage", pagination.value.current_page);
  if (pagination.value.total_pages < 15) {
    return Array.from({ length: pagination.value.total_pages }, (_, i) => i + 1);
  } else {
    if (
      pagination.value.current_page <= 3 ||
      pagination.value.current_page > pagination.value.total_pages - 3
    ) {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        "...",
        pagination.value.total_pages - 2,
        pagination.value.total_pages - 1,
        pagination.value.total_pages
      ];
      const midArr = [];
      for (
        let i = Math.ceil(pagination.value.total_pages / 2) - 1;
        i <= Math.ceil(pagination.value.total_pages / 2) + 1;
        i++
      ) {
        midArr.push(i);
      }
      return [...firstArr, ...midArr, ...lastArr];
    } else if (pagination.value.current_page <= 6) {
      const firstArr = [1, 2, 3];
      const lastArr = [
        "...",
        pagination.value.total_pages - 2,
        pagination.value.total_pages - 1,
        pagination.value.total_pages
      ];
      const midArr = [4, 5, 6, 7];
      return [...firstArr, ...midArr, ...lastArr];
    } else if (pagination.value.current_page >= pagination.value.total_pages - 4) {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        pagination.value.total_pages - 2,
        pagination.value.total_pages - 1,
        pagination.value.total_pages
      ];
      const midArr = [
        pagination.value.total_pages - 6,
        pagination.value.total_pages - 5,
        pagination.value.total_pages - 4,
        pagination.value.total_pages - 3
      ];
      return [...firstArr, ...midArr, ...lastArr];
    } else {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        "...",
        pagination.value.total_pages - 2,
        pagination.value.total_pages - 1,
        pagination.value.total_pages
      ];
      const midArr = [
        pagination.value.current_page - 1,
        pagination.value.current_page,
        pagination.value.current_page + 1
      ];
      return [...firstArr, ...midArr, ...lastArr];
    }
  }
});

const emits = defineEmits(["changePage", "previousPage", "nextPage"]);
const changePage = (page: number | string) => {
  if (page === "..." || typeof page === "string") return;
  pagination.value.current_page = Number(page);
  emits("changePage", page);
};
const previousPage = () => {
  if (pagination.value.current_page > 1) {
    pagination.value.current_page--;
    emits("previousPage");
  }
};
const nextPage = () => {
  if (pagination.value.current_page < pagination.value.total_pages) {
    pagination.value.current_page++;
    emits("nextPage");
  }
};
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px text-sm lg:text-base h-8 lg:h-10">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 lg:px-4 h-8 lg:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          :disable="!pagination.has_pre"
          @click.prevent="previousPage"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </a>
      </li>
      <li v-for="(page, index) in showPaginationList">
        <a
          href="#"
          aria-current="page"
          class="min-w-11 max-w-12 flex items-center justify-center px-3 lg:px-4 h-8 lg:h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          :key="index"
          :class="
            page === pagination.current_page
              ? 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-white'
              : ' dark:bg-gray-700 bg-white'
          "
          @click.prevent="changePage(page)"
          >{{ page }}</a
        >
      </li>
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 lg:px-4 h-8 lg:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          :disable="!pagination.has_next"
          @click.prevent="nextPage"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-3 h-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style></style>
