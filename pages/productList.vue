<script lang="ts" setup>
import { type FetchProductsData } from "@/types/productTypes";
import { type SearchBarEmitInfo } from "@/types/searchBarTypes";
import { getProducts } from "@/apis/products";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const productStore = useProductStore();
const { productDataList } = storeToRefs(productStore);
const { data } = await useAsyncData("getProducts", async () => {
  if (productDataList.value.length === 0) {
    const res = await getProducts();
    return (res as FetchProductsData).products;
  }
});
if (data.value) {
  productDataList.value = data.value;
}
const searchButtonConfig = {
  priceHighToLow: true,
  priceLowToHigh: true,
  search: true,
  clearSearch: true
};
const showProductList = ref(productDataList.value);
const handlePriceHighToLow = () => {
  showProductList.value = showProductList.value.sort((a, b) => b.price - a.price);
};
const handlePriceLowToHigh = () => {
  showProductList.value = showProductList.value.sort((a, b) => a.price - b.price);
};

const handleSearch = (searchData: SearchBarEmitInfo) => {
  const { searchInfo, minPrice, maxPrice } = searchData;
  isLoading.value = true;
  // 篩選商品列表
  showProductList.value = productDataList.value.filter((product) => {
    // 檢查搜尋字串
    const matchSearchInfo =
      product.title.includes(searchInfo) ||
      product.category.includes(searchInfo) ||
      product.content.includes(searchInfo) ||
      product.description.includes(searchInfo);
    return matchSearchInfo;
  });
  showProductList.value = showProductList.value.filter((product) => {
    // 檢查價格區間
    if (minPrice === "" && maxPrice === "") return true;
    else if (minPrice && maxPrice === "") {
      return product.price >= Number(minPrice);
    } else if (maxPrice && minPrice === "") {
      return product.price <= Number(maxPrice);
    } else {
      return product.price >= Number(minPrice) && product.price <= Number(maxPrice);
    }
  });
  // 移除重複的產品
  showProductList.value = [...new Set(showProductList.value)];
  isLoading.value = false;
};
</script>
<template>
  <SearchSearchbar
    :autoCompleteListProp="productDataList"
    :searchButtonConfigProp="searchButtonConfig"
    @priceHighToLow="handlePriceHighToLow"
    @priceLowToHigh="handlePriceLowToHigh"
    @search="handleSearch"
  ></SearchSearchbar>
  <div class="container mx-auto">
    <ProductCardList class="px-2 md:px-0" :productListProp="showProductList"> </ProductCardList>
  </div>
</template>
<style></style>
