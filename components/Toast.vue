<script lang="ts" setup>
const toastRef = ref<(HTMLElement | null)[]>([]);
const closeRef = ref<(HTMLElement | null)[]>([]);
const toastStore = useToastStore();
const { toastList } = storeToRefs(toastStore);
const interval = ref();
const hoveredToastIndex = ref<number | null>(null);
const deleteInfo = () => {
  interval.value = setInterval(() => {
    if (hoveredToastIndex.value === null) {
      toastList.value.shift();
    }
  }, toastList.value[0]?.duration || 3000);
};
const deleteToast = (index: number) => {
  toastList.value.splice(index, 1);
};
const handleMouseEnter = (index: number) => {
  hoveredToastIndex.value = index;
  if (interval.value) {
    clearInterval(interval.value);
  }
};

const handleMouseLeave = () => {
  hoveredToastIndex.value = null;
  deleteInfo();
};
watch(
  toastList,
  () => {
    // 清除之前的定时器
    if (interval.value) {
      clearInterval(interval.value);
    }
    if (process.client) {
      if (toastList.value.length > 0) {
        deleteInfo();
      } else {
        clearInterval(interval.value);
      }
    }
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  useFlowbite(({ initDismisses }) => {
    initDismisses();
  });
});
onUnmounted(() => {
  clearInterval(interval.value);
});
</script>
<template>
  <div class="w-full fixed top-5 md:w-auto md:right-5 z-50 flex flex-col">
    <div
      v-for="(item, index) in toastList"
      :key="index"
      class="w-full flex justify-center md:justify-right md:min-w-[260px]"
    >
      <div
        v-if="item?.type === 'success'"
        :ref="
          (el) => {
            if (el) toastRef[index] = el as HTMLElement;
          }
        "
        :id="`toast${index}`"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ item.message }}</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          :data-dismiss-target="`#toast${index}`"
          :id="`closeToast${index}`"
          :ref="
            (el) => {
              if (el) closeRef[index] = el as HTMLElement;
            }
          "
          @click="deleteToast(index)"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div
        v-else-if="item?.type === 'danger'"
        :ref="
          (el) => {
            if (el) toastRef[index] = el as HTMLElement;
          }
        "
        :id="`toast${index}`"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ item.message }}</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          :data-dismiss-target="`#toast${index}`"
          :id="`closeToast${index}`"
          :ref="
            (el) => {
              if (el) closeRef[index] = el as HTMLElement;
            }
          "
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div
        v-else-if="item?.type === 'warning'"
        :ref="
          (el) => {
            if (el) toastRef[index] = el as HTMLElement;
          }
        "
        :id="`toast${index}`"
        class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
            />
          </svg>
          <span class="sr-only">Warning icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ item.message }}</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          :data-dismiss-target="`#toast${index}`"
          :id="`closeToast${index}`"
          :ref="
            (el) => {
              if (el) closeRef[index] = el as HTMLElement;
            }
          "
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
