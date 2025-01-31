<script lang="ts" setup>
import type { SearchBarEmitInfo } from "@/types/searchBarTypes";
import { searchProducts } from "@/apis/products";

const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const productStore = useProductStore();
const { productDataList, productPaginationData } = storeToRefs(productStore);
const { data } = await useAsyncData(`searchProducts`, () => {
  return searchProducts();
});
if (data.value?.status && process.server) {
  productDataList.value = data.value.data.products;
  productPaginationData.value = data.value.data.pagination;
}

const searchButtonConfig = {
  priceHighToLow: true,
  priceLowToHigh: true,
  search: true,
  clearSearch: true
};
const handlePriceHighToLow = () => {
  productDataList.value = productDataList.value.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
};
const handlePriceLowToHigh = () => {
  productDataList.value = productDataList.value.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
};
const handleMaxPrice = (maxPrice: string | number) => {
  currentSearchData.value.maxPrice = maxPrice;
};
const handleMinPrice = (minPrice: string | number) => {
  currentSearchData.value.minPrice = minPrice;
};
const currentSearchData = ref<SearchBarEmitInfo>({
  searchInfo: "",
  minPrice: "",
  maxPrice: ""
});
const handleCleanSearch = () => {
  currentSearchData.value.searchInfo = "";
  currentSearchData.value.minPrice = "";
  currentSearchData.value.maxPrice = "";
};
const handleChangePage = async (page: number) => {
  await handleSearch(null, page);
};
const handleSearch = async (searchData?: SearchBarEmitInfo | null, page: number = 1) => {
  if (searchData) {
    const { searchInfo, minPrice, maxPrice } = searchData;
    if (searchInfo) {
      currentSearchData.value.searchInfo = searchInfo;
    }
    if (minPrice) {
      currentSearchData.value.minPrice = minPrice;
    }
    if (maxPrice) {
      currentSearchData.value.maxPrice = maxPrice;
    }
  }

  try {
    isLoading.value = true;

    const res = await searchProducts(
      currentSearchData.value.searchInfo,
      page,
      10,
      currentSearchData.value.minPrice === "" ? null : Number(currentSearchData.value.minPrice),
      currentSearchData.value.maxPrice === "" ? null : Number(currentSearchData.value.maxPrice)
    );
    productPaginationData.value = res.data.pagination;
    productDataList.value = res.data.products;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="container mx-auto max-w-7xl">
    <SearchSearchbar
      :autoCompleteListProp="productDataList"
      :searchButtonConfigProp="searchButtonConfig"
      @priceHighToLow="handlePriceHighToLow"
      @priceLowToHigh="handlePriceLowToHigh"
      @search="handleSearch"
      @changeMinPrice="handleMinPrice"
      @changeMaxPrice="handleMaxPrice"
      @clearSearch="handleCleanSearch"
    ></SearchSearchbar>
    <div class="container mx-auto max-w-7xl">
      <ProductCardList class="px-2 md:px-0" :productListProp="productDataList"> </ProductCardList>
      <Pagination :pagination="productPaginationData" @changePage="handleChangePage" />
    </div>
  </div>
</template>
<style></style>
