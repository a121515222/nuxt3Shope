<script lang="ts" setup>
import { type SearchButtonConfig, type AutoCompleteProps } from "@/types/searchTypes";
type combineType = AutoCompleteProps & SearchButtonConfig;
const props = withDefaults(defineProps<combineType>(), {
  autoCompleteListProp: (): string[] => [],
  isShowAutoComplete: false,
  priceHightToLow: false,
  priceLowToHight: false,
  dateOldToNew: false,
  dateNewToNew: false,
  search: true,
  clearSearch: true
});
const { searchInfo, minPrice, maxPrice, favorites, oldDate, newDate } = toRefs(
  useSearchRefs(props)
);
const emit = defineEmits([
  "priceHightToLow",
  "priceLowToHight",
  "dateOldToNew",
  "dateNewToNew",
  "search",
  "clearSearch"
]);
const handleCompleteListEmit = (value: string) => {
  console.log("handleCompleteListEmit", value);
};
</script>
<template>
  <div class="flex flex-col md:flex-row md:items-center justify-center gap-4 py-2">
    <input
      class="form-control md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
      ref="searchInput"
      type="text"
      v-model="searchInfo"
      placeholder="請輸入關鍵字"
    />
    <AutoComplete
      :autoCompleteListProp="props.autoCompleteListProp"
      :isShowAutoCompleteProp="props.isShowAutoCompleteProp"
      @autoCompleteListEmit="handleCompleteListEmit"
    />
    <input
      v-if="props.priceHightToLow || props.priceLowToHight"
      class="form-control md:w-1/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
      type="number"
      placeholder="請輸入最低價格"
      v-model="minPrice"
      min="0"
    />
    <input
      v-if="props.priceHightToLow || props.priceLowToHight"
      class="form-control md:w-1/4 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
      type="number"
      placeholder="請輸入最高價格"
      v-model="maxPrice"
      min="0"
    />
  </div>
  <div class="flex flex-col sm:flex-row items-center justify-center gap-2 pt-3 pb-2">
    <button
      v-if="(favorites?.value?.length ?? 0) !== 0"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      顯示我的最愛
    </button>
    <button
      v-if="props.priceHightToLow"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      價格由大至小排列
    </button>
    <button
      v-if="props.priceLowToHight"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      價格由小至大排列
    </button>
    <button
      v-if="props.clearSearch"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      清除搜尋
    </button>
    <button
      v-if="props.search"
      type="button"
      class="btn bg-primary text-secondary hover:text-primary hover:bg-secondary py-2 px-4 rounded"
    >
      搜尋
    </button>
  </div>
</template>
<style></style>
