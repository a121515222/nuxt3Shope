<script lang="ts" setup>
import { type SearchButtonConfig, type AutoComplete } from "@/types/searchTypes";

interface SearchBarProps {
  autoCompleteListProp: string[];
  searchButtonConfigProp: SearchButtonConfig;
}
const props = withDefaults(defineProps<SearchBarProps>(), {
  autoCompleteListProp: (): string[] => [],
  searchButtonConfigProp: () => ({
    priceHighToLow: false,
    priceLowToHigh: false,
    dateOldToNew: false,
    dateNewToOld: false,
    search: true,
    clearSearch: true
  })
});
// const searchRefs =
//   useSearchRefs(props.searchButtonConfigProp) ??
//   reactive({
//     searchInfo: ref(""),
//     minPrice: ref(""),
//     maxPrice: ref(""),
//     favorites: ref([])
//   });

// const { searchInfo, minPrice, maxPrice } = toRefs(searchRefs);
const searchInfo = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const favorites = ref([]);
const oldDate = ref("");
const newDate = ref("");
const isShowAutoComplete = ref(false);
const emit = defineEmits([
  "priceHightToLow",
  "priceLowToHight",
  "dateOldToNew",
  "dateNewToNew",
  "search",
  "clearSearch"
]);
const handleCompleteListEmit = (value: string) => {
  isShowAutoComplete.value = false;
  searchInfo.value = value;
  console.log("handleCompleteListEmit", value);
};
watch(searchInfo as unknown as Ref<string>, (value) => {
  if (value) {
    isShowAutoComplete.value = true;
    // 如果搜尋關鍵字在自動完成列表中，則不顯示自動完成列表
    if (props.autoCompleteListProp.includes(value)) {
      isShowAutoComplete.value = false;
    }
  } else {
    isShowAutoComplete.value = false;
  }
});
</script>
<template>
  <div class="flex flex-col md:flex-row md:items-center justify-center gap-4 py-2">
    <div class="relative md:w-1/4">
      <input
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
        ref="searchInput"
        type="text"
        v-model="searchInfo"
        placeholder="請輸入關鍵字"
      />
      <AutoComplete
        class="absolute w-full left-0 z-10"
        :autoCompleteListProp="props.autoCompleteListProp"
        :isShowAutoCompleteProp="isShowAutoComplete"
        :searchInfoProp="searchInfo"
        @autoCompleteListEmit="handleCompleteListEmit"
      />
    </div>

    <input
      v-if="
        props.searchButtonConfigProp?.priceHighToLow || props.searchButtonConfigProp?.priceLowToHigh
      "
      class="md:w-1/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
      type="number"
      placeholder="請輸入最低價格"
      v-model="minPrice"
      min="0"
    />
    <input
      v-if="
        props.searchButtonConfigProp?.priceHighToLow || props.searchButtonConfigProp?.priceLowToHigh
      "
      class="md:w-1/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
      type="number"
      placeholder="請輸入最高價格"
      v-model="maxPrice"
      min="0"
    />
  </div>
  <div class="flex flex-col sm:flex-row items-center justify-center gap-2 pt-3 pb-2">
    <button
      v-if="(favorites.length ?? 0) !== 0"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      顯示我的最愛
    </button>
    <button
      v-if="props.searchButtonConfigProp?.priceHighToLow"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      價格由大至小排列
    </button>
    <button
      v-if="props.searchButtonConfigProp?.priceLowToHigh"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      價格由小至大排列
    </button>
    <button
      v-if="props.searchButtonConfigProp?.clearSearch"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      清除搜尋
    </button>
    <button
      v-if="props.searchButtonConfigProp?.search"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      搜尋
    </button>
  </div>
</template>
<style></style>
