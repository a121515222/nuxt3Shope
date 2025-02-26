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
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652259953185.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SiEnRDMhsYt%2Bv98iDemtQRTjL5WG1Y0AuxwgZTiJM9FU9q5WTzkpjB0xkghzcPVGEEaLChFR6uAe2TI59nQJhoBoKcK3kW64YleYC9ITfDZdMHe9M833Kzd7t0lAS5UCR0h8tUNbQnmoWh9JbfnjM3Pf%2BYvc14e912vBgKGL6oesX6rjTfk79S%2FiX2aVszTSf3D3mEWZZ%2BXtyPwghbBFjl7n2BoEtzXFIk%2B%2B49mcbgbHWw%2FMpoeTNfSFKYK4qVoVSoXrC15wVoB3FReLzSLHupyGPMzcPi0qKb51HyBoLmFznvTxymoOUHBP%2FawPbQ9o7%2BkdHsDioaGbJwIGt29gnA%3D%3D",
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260184963.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=juhYb%2FKhH1KWiij7g9tU4voNPdpyDTZtNIv49R0W8554DsSBmkqci3Bd0iOp250NMR1sMgGB9coee80SJ0CeoP%2FaKesb5SotKZRVvl1W56ym6G3W1mCYMU4WORjT5Zqeny0%2Bao0hOZXCXQg4S5T6oJh6XksRjeOg8ilCL0FePTOhhjoejsTmRCKycmaUSoS7VismMPvDu8B6c7apgFESWGM59dKlu60M%2Bome3hvsJsUwpvXnShhKQ6h4oj56jpirqMxczxE5joTagHYbNZYeMxcG%2Bzl64vMu%2Fz%2F4%2FnI0XgLmXOG%2FdjWNGZ0fzsoRK3UPMA6lydQAJifWw3afW4FoSg%3D%3D",
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260045306.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YG9ZpKhC%2F9WFYAlqCTDJ1sijGMTONgAeEG2DFkI6Z%2FssrMX968TP075wxK8G3%2FBmRp9IkMJrVNDqkRVjY5zjar1wGhlCHUtDqKX%2FAnYAEJEyZjg9N8BcyoztpPgw5RP90kzY8eqrtrA3uKHR0kVX3yNoauNbXQX1OJ67Mtc9hG2fj%2FiXhP%2BIxkiCxbQ9f5OeCJaxLzkwnyNJxmcNvTfM23XfN3YL8nTih61uvwrBZtAK%2Bknuh%2F1%2BlyE5VrXKmB%2BiIAAxe6dcoqcPzwOppiPonf7VYB8PNNeLRxITXkHHtz4Q3IczUeusPo1LPXx3Rz0blmpSSqQOJEX17FeH7D7aiw%3D%3D"
  ],
  isMainBanner: true
};
const subBannerConfig = {
  imagesPath: [
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260099287.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZRPB2H%2BL4eMyzETsJo6S9hxSXmiZMwWFS7r9OW5dJ%2BaAFtE59RzAr50pO1rVS3PvUeKaPH4U6sUHlXOzHAJxpBYOgg3rHfmMuyjlg4qUwD%2FS1GhVzxGxfu%2BRmhFRnJFSMjgyvI7Zcx0g3zpvxvgSDWGxO3uSuSYUqOHUKdnvRzvE%2FbYF0iJN82lxr9UG9vcl9O0TNIlLf%2F%2FCFxAqsKTDvNUmumsoH3cVaI8XutbqO%2FMqqN0txbvbKZqT0t%2Bm1c%2FOM78S5O5Ggbksc3k8POKqWBvV7N%2F8MwhD57KgKBGjTw8qtrAxmgvduEaFO%2B8M3CqIEIK0Jw83Md1LHUIwi9I5wA%3D%3D"
  ],
  isMainBanner: false,
  bannerHeight: "30vh",
  style: ["bg-center-bottom"]
};
const buttonBannerConfig = {
  imagesPath: [
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260363517.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=E%2FkEzKyp%2BtIyg6DGjzDAXAlAwrImtalmqjoH8DvwudNk49puvmRmAdtQTS1SL%2FvHhARiw%2FuhiHG0ICkOlHpft6NRk0hgKaHEVi1TyApl62rGJPXDJpOHwZRkiVPzoIqO8R2SY7YIusJBsyZmf8cI7Hr4S5BXBGupValaxIz2p%2FtZv4jj3a2DUZMuyPK8yHZF00V7UxooszeX6OiBQhFMxnIYjvgXHkQuV6OHJq3%2BUjdXW0ubLIq7TI%2FuXzd3bOieFLiTwu8QyI8%2BLeQjXIdywEqkUycavR2zWaNZwlxHiJArhQHvmfuO%2Fot5P%2BnQJeX5uz09m%2FuL1JDZz2KFk56IBQ%3D%3D"
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
