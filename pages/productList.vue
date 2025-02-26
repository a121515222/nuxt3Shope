<script lang="ts" setup>
useSeoMeta({
  title: "自種自售-產品列表",
  description: "上架自家農產品的店商網頁-產品列表(展示用)",
  ogTitle: "自種自售-產品列表",
  ogDescription: "上架自家農產品的店商望網頁-產品列表(展示用)",
  ogUrl: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}/productList`,
  ogType: "website",
  ogLocale: "zh_TW",
  ogImage: `https://${process.env.NUXT_PUBLIC_FRONTEND_URL}/og-image.jpg`,
  ogImageType: "image/jpeg",
  ogImageWidth: "1200",
  ogImageHeight: "630"
});
import type { SearchBarEmitInfo } from "@/types/searchBarTypes";
import type { Product } from "@/types/productTypes";
import type { Pagination } from "@/types/paginationTypes";
import { useFetchProducts } from "@/composables/useFetchProduct";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const productDataList = useState<Product[]>("productDataList", () => []);
const productPaginationData = useState<Pagination>("productPaginationData", () => {
  return {
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
    limit: 0,
    hasPrevPage: false,
    hasNextPage: false
  };
});
if (process.server) {
  const { products, pagination } = await useFetchProducts();
  productDataList.value = products;
  productPaginationData.value = pagination;
} else {
  // 客戶端邏輯，使用已經從 SSR 中獲取並存儲的資料
  if (productDataList.value.length === 0) {
    // 如果頁面切換後資料尚未存在，可以重新請求
    const { products, pagination } = await useFetchProducts();
    productDataList.value = products;
    productPaginationData.value = pagination;
  }
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

    const { products, pagination } = await useFetchProducts(
      currentSearchData.value.searchInfo,
      page,
      10,
      currentSearchData.value.minPrice === "" ? null : Number(currentSearchData.value.minPrice),
      currentSearchData.value.maxPrice === "" ? null : Number(currentSearchData.value.maxPrice)
    );
    productPaginationData.value = pagination;
    productDataList.value = products;
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
    <div class="container mx-auto max-w-7xl px-2">
      <ProductCardList class="px-2 md:px-0" :productListProp="productDataList"> </ProductCardList>
      <Pagination :pagination="productPaginationData" @changePage="handleChangePage" />
    </div>
  </div>
</template>
<style></style>
