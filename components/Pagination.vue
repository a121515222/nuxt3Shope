<script lang="ts" setup>
import type { Pagination } from "@/types/paginationTypes";
import { useThrottleFn } from "@vueuse/core";

interface PaginationProps {
  pagination?: Pagination;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pagination: (): Pagination => ({
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
    limit: 10,
    hasPrevPage: false,
    hasNextPage: true
  })
});

const showPaginationList = computed(() => {
  if (props.pagination.totalPages < 15) {
    return Array.from({ length: props.pagination.totalPages }, (_, i) => i + 1);
  } else {
    if (
      props.pagination.currentPage <= 3 ||
      props.pagination.currentPage > props.pagination.totalPages - 3
    ) {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        "...",
        props.pagination.totalPages - 2,
        props.pagination.totalPages - 1,
        props.pagination.totalPages
      ];
      const midArr = [];
      for (
        let i = Math.ceil(props.pagination.totalPages / 2) - 1;
        i <= Math.ceil(props.pagination.totalPages / 2) + 1;
        i++
      ) {
        midArr.push(i);
      }
      return [...firstArr, ...midArr, ...lastArr];
    } else if (props.pagination.currentPage <= 6) {
      const firstArr = [1, 2, 3];
      const lastArr = [
        "...",
        props.pagination.totalPages - 2,
        props.pagination.totalPages - 1,
        props.pagination.totalPages
      ];
      const midArr = [4, 5, 6, 7];
      return [...firstArr, ...midArr, ...lastArr];
    } else if (props.pagination.currentPage >= props.pagination.totalPages - 4) {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        props.pagination.totalPages - 2,
        props.pagination.totalPages - 1,
        props.pagination.totalPages
      ];
      const midArr = [
        props.pagination.totalPages - 6,
        props.pagination.totalPages - 5,
        props.pagination.totalPages - 4,
        props.pagination.totalPages - 3
      ];
      return [...firstArr, ...midArr, ...lastArr];
    } else {
      const firstArr = [1, 2, 3, "..."];
      const lastArr = [
        "...",
        props.pagination.totalPages - 2,
        props.pagination.totalPages - 1,
        props.pagination.totalPages
      ];
      const midArr = [
        props.pagination.currentPage - 1,
        props.pagination.currentPage,
        props.pagination.currentPage + 1
      ];
      return [...firstArr, ...midArr, ...lastArr];
    }
  }
});

const emits = defineEmits(["changePage"]);
const changePage = useThrottleFn((page: number | string) => {
  if (page === "..." || typeof page === "string") return;
  emits("changePage", page);
}, 500);
const previousPage = useThrottleFn(() => {
  if (props.pagination.currentPage > 1) {
    props.pagination.currentPage--;
    emits("changePage", props.pagination.currentPage);
  }
}, 500);
const nextPage = useThrottleFn(() => {
  if (props.pagination.currentPage < props.pagination.totalPages) {
    props.pagination.currentPage++;
    emits("changePage", props.pagination.currentPage);
  }
}, 500);
</script>
<template>
  <nav aria-label="Page navigation" v-if="props.pagination.totalPages > 0">
    <ul class="flex items-center -space-x-px text-sm lg:text-base h-8 lg:h-10">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-3 lg:px-4 h-8 lg:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          :disable="!pagination.hasPrevPage"
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
            page === pagination.currentPage
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
          :disable="!pagination.hasNextPage"
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
