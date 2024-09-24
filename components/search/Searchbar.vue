<script lang="ts" setup>
import { type SearchButtonConfig } from "@/types/searchTypes";
import { useSearchbar } from "./useSearchbar";
import AutoComplete from "./AutoComplete.vue";
import { priceValidatePattern } from "@/utils/validatePattern";
interface SearchBarProps {
  autoCompleteListProp: string[];
  searchButtonConfigProp: SearchButtonConfig;
}
const { searchInfo, minPrice, maxPrice, favorites, isShowAutoComplete, handleCompleteListEmit } =
  useSearchbar();

// 定義 props 並設置預設值
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
const emits = defineEmits([
  "priceHightToLow",
  "priceLowToHight",
  "dateOldToNew",
  "dateNewToNew",
  "search",
  "clearSearch"
]);

const minPriceInputRef = ref<HTMLInputElement | null>(null);
const maxPriceInputRef = ref<HTMLInputElement | null>(null);
const minPriceInputErrorMessageRef = ref<HTMLParagraphElement | null>(null);
const maxPriceInputErrorMessageRef = ref<HTMLParagraphElement | null>(null);
const validateInput = (
  rule: (data: string | number) => boolean,
  data: string,
  errorMessageToDisplays: string,
  errorMessageRef: HTMLParagraphElement
) => {
  if (!rule(data)) {
    errorMessageRef.textContent = errorMessageToDisplays;
    addValidationStyle(errorMessageRef);
    return false;
  } else {
    resetValidationStyle(errorMessageRef);
    return true;
  }
};

const addValidationStyle = (ref: HTMLElement) => {
  ref.classList.remove("opacity-0");
};

const resetValidationStyle = (ref: HTMLElement) => {
  ref.classList.add("opacity-0");
};

const productPriceRule = (data: string | number): boolean => {
  const strData = String(data);
  return priceValidatePattern.test(strData);
};
watch(searchInfo, (value) => {
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
    <div class="relative md:w-1/4 px-4">
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
      <p
        class="mt-2 w-full pl-2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-0"
      >
        {{}}
      </p>
    </div>
    <div class="relative">
      <input
        v-if="
          props.searchButtonConfigProp?.priceHighToLow ||
          props.searchButtonConfigProp?.priceLowToHigh
        "
        ref="minPriceInputRef"
        :pattern="priceValidatePattern.source"
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 focus:invalid:ring-red-500"
        placeholder="請輸入最低價格"
        v-model="minPrice"
        min="0"
        @blur="
          validateInput(
            productPriceRule,
            minPrice,
            '請輸入大於0的數字',
            minPriceInputErrorMessageRef as HTMLParagraphElement
          )
        "
      />
      <p
        ref="minPriceInputErrorMessageRef"
        class="w-full h-full mt-2 pl-2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-40px]"
      ></p>
    </div>
    <div class="relative">
      <input
        v-if="
          props.searchButtonConfigProp?.priceHighToLow ||
          props.searchButtonConfigProp?.priceLowToHigh
        "
        :pattern="priceValidatePattern.source"
        ref="maxPriceInputRef"
        class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 focus:invalid:ring-red-500"
        placeholder="請輸入最高價格"
        v-model="maxPrice"
        min="0"
        @blur="
          validateInput(
            productPriceRule,
            maxPrice,
            '請輸入大於0的數字',
            maxPriceInputErrorMessageRef as HTMLParagraphElement
          )
        "
      />
      <p
        ref="maxPriceInputErrorMessageRef"
        class="w-full h-full mt-2 pl-2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-40px]"
      ></p>
    </div>
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
