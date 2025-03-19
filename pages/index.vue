<script lang="ts" setup>
import type { Product } from "@/types/productTypes";
import type { Article } from "@/types/articleTypes";
import { useFetchArticles } from "@/composables/useFetchArticle";
import { useFetchProducts } from "@/composables/useFetchProduct";
const indexProductDataList = useState<Product[]>("indexProductDataList", () => []);
const specialProductDataList = useState<Product[]>("specialProductDataList", () => []);
const indexArticleDataList = useState<Article[]>("indexArticleDataList", () => []);
if (process.server) {
  const { products: getIndexProductData } = await useFetchProducts("百香果 醜豆");
  const { products: getSpecialProductData } = await useFetchProducts("精油");
  const { articles } = await useFetchArticles();
  const [indexProduct, specialProduct, indexArticle] = await Promise.all([
    getIndexProductData,
    getSpecialProductData,
    articles
  ]);
  indexProductDataList.value = indexProduct;
  specialProductDataList.value = specialProduct;
  indexArticleDataList.value = indexArticle;
} else {
  // 客戶端邏輯，使用已經從 SSR 中獲取並存儲的資料
  if (indexProductDataList.value.length === 0) {
    // 如果頁面切換後資料尚未存在，可以重新請求
    const { products: getIndexProductData } = await useFetchProducts("百香果 醜豆");
    indexProductDataList.value = getIndexProductData;
  }
  if (specialProductDataList.value.length === 0) {
    // 如果頁面切換後資料尚未存在，可以重新請求
    const { products: getSpecialProductData } = await useFetchProducts("精油");
    specialProductDataList.value = getSpecialProductData;
  }
  if (indexArticleDataList.value.length === 0) {
    // 如果頁面切換後資料尚未存在，可以重新請求
    const { articles } = await useFetchArticles();
    indexArticleDataList.value = articles;
  }
}
const bannerConfig = {
  duration: 6000,
  imagesPath: [
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FIMG_9359.JPG?alt=media&token=48410a79-62b5-444a-a435-87a0778051fc",
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FDuWGTAnc8x7CWX9t-generated_image.jpg?alt=media&token=b14a24a6-c30a-48e8-852b-497e872e0b22",
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FRlh3PIsGcf5fOeRc-generated_image.jpg?alt=media&token=5761ace9-2461-49f4-a80b-e62650eaad45",
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FZBdgw33tP85J6wX9-generated_image.jpg?alt=media&token=5238df68-d25f-4f3c-a7be-f5ffedcacf33"
  ],
  isMainBanner: true
};
const subBannerConfig = {
  imagesPath: [
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2Fzj64QUx9EY8aDnx0-generated_image.jpg?alt=media&token=ac716598-cecf-40ba-9bfe-9fa5e03070b0"
  ],
  isMainBanner: false,
  bannerHeight: "30vh",
  style: ["bg-center-bottom"]
};
const buttonBannerConfig = {
  imagesPath: [
    "https://firebasestorage.googleapis.com/v0/b/imagestorge-b6395.appspot.com/o/vueShop%2FDuWGTAnc8x7CWX9t-generated_image.jpg?alt=media&token=b14a24a6-c30a-48e8-852b-497e872e0b22"
  ],
  isMainBanner: false,
  bannerHeight: "30vh",
  style: ["bg-center-bottom"]
};
const articleDataConfig = {
  isMainArticle: true
};
onMounted(() => {});

onUnmounted(() => {});
</script>
<template>
  <LayoutBanner :bannerConfigProp="bannerConfig">
    <template #bannerSlogan>
      <p
        class="text-3xl md:text-5xl text-secondary font-bold text-shadow shadow-black whitespace-nowrap"
      >
        想體驗新鮮的農產品嗎?
      </p>
    </template>
    <template #bannerBtn>
      <div class="flex flex-row justify-center">
        <NuxtLink
          to="/productList"
          class="text-sm md:text-2xl text-primary bg-secondary hover:bg-white hover:text-orange-500 rounded-lg px-4 py-2 mt-4"
        >
          立即了解
        </NuxtLink>
      </div>
    </template>
  </LayoutBanner>
  <div class="container mx-auto max-w-7xl">
    <LayoutCrossCard :cardProductsDataProps="indexProductDataList"> </LayoutCrossCard>
  </div>
  <LayoutBanner :bannerConfigProp="subBannerConfig">
    <template #bannerSlogan>
      <p
        class="text-3xl md:text-5xl text-secondary font-bold text-shadow shadow-black whitespace-nowrap"
      >
        小知識
      </p>
    </template>
    <template #bannerBtn>
      <div class="flex flex-row justify-center pb-8">
        <NuxtLink
          to="/articleList"
          class="text-sm md:text-2xl text-primary bg-secondary hover:bg-white hover:text-orange-500 rounded-lg px-4 py-2 mt-4"
        >
          了解更多
        </NuxtLink>
      </div>
    </template>
  </LayoutBanner>
  <div class="container mx-auto max-w-7xl">
    <LayoutArticleCard
      class="pt-4"
      :articleDataProps="indexArticleDataList"
      :articleDataConfig="articleDataConfig"
    ></LayoutArticleCard>
  </div>
  <LayoutBanner :bannerConfigProp="buttonBannerConfig">
    <template #bannerSlogan>
      <p
        class="text-3xl md:text-5xl text-secondary font-bold text-shadow shadow-black whitespace-nowrap"
      >
        還有更特別的
      </p>
    </template>
  </LayoutBanner>
  <div class="container mx-auto max-w-7xl">
    <LayoutCrossCard :cardProductsDataProps="specialProductDataList"> </LayoutCrossCard>
  </div>
</template>
<style></style>
