<script lang="ts" setup>
import { searchArticles } from "@/apis/articles";
import { searchProducts } from "@/apis/products";
const productStore = useProductStore();
const articleStore = useArticleStore();
const { indexProductDataList, specialProductDataList } = storeToRefs(productStore);
const { indexArticleDataList } = storeToRefs(articleStore);

const { data: getIndexProductData } = await useAsyncData("getIndexProducts", () => {
  return searchProducts("百香果 醜豆");
});
const { data: getSpecialProductData } = await useAsyncData("getSpecialProducts", () => {
  return searchProducts("精油");
});
const { data: getIndexArticleData } = await useAsyncData("getIndexArticles", () => {
  return searchArticles();
});

try {
  const [indexProduct, specialProduct, indexArticle] = await Promise.all([
    getIndexProductData,
    getSpecialProductData,
    getIndexArticleData
  ]);

  if (indexProduct.value?.status && process.server) {
    indexProductDataList.value = indexProduct.value.data.products;
  }
  if (specialProduct.value?.status && process.server) {
    specialProductDataList.value = specialProduct.value.data.products;
  }
  if (indexArticle.value?.status && process.server) {
    indexArticleDataList.value = indexArticle.value.data.articles;
  }
} catch (error) {
  console.error("Error fetching data:", error);
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
// const specialProductDataList: Product[] = [
//   {
//     category: "精油",
//     content: "澳洲茶樹精油-單瓶裝5ml",
//     description:
//       "被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。 純粹無添加多餘物質的天然精油，小瓶裝5ml方便隨身攜帶。",
//     id: "-MyQOc_ZlhDQDBJDIEG1",
//     imageUrl:
//       "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980175616.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fZoOoMuXsdEZw4rVAG1rNM2XTpOnTvqY65FzF%2BvWL6v2Xau%2FG%2BfifaetqEX84VIAnvuFdkDKf0KnrxHkdPEBPe2DmaK7aLgGZnB%2BwVe8QO8%2FZ1TWkBTb%2F%2FC39bdyinaa9T9oWJYO68te9SEnb6KVv9YU2HRYeeyLqIc%2B4Dtgig70xNsOtQD9KKcJ7mleMnW0aCYre7afOikzmhZiWKlRE9hlAQMh94FUC9WCafR1Oh0SgEnMxNqoWL5a0MRsvAYSZXDYOIl7MmSIvfpDa5myNMCE2VdmZ0zEWLgzGnnHefgdy4jU673QCcCqVA61ucKJUZVXR%2Fus28AJJTGyCMknOg%3D%3D",
//     imagesUrl: [
//       "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980230759.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qG%2B5r7xTv5XDozEHc6wBFaEwVOYghM%2BIviUt0PS%2BCktLnONArXWcjI1c7ZSFFgZ1qM%2FTbM1kge%2BydBMK8Wpot%2FExSUBffgtkPeVnS9rBHbeEcGVIBLsz2BeNXtJCAfTBwQrcwQ1CrlHB75llUHK5I91fu34%2BYGFE9cAf9i2IvsAxb9XFaJN9Cxna7N8mPRsqqB%2BwTy8eWrKN8ojVoToi4WzbEe%2Fk6uTrSlMALuIf3QWFJcMEMxsSptK%2BCFlKCLbHfr90WkWgFtTuu15A%2BM%2BdqjZNIekIpvLXBuG9aXBwY11jWhgqsxM2Z5USXOo0%2FGuYb4Ab3YMnwp2qw5fS0rDw6w%3D%3D",
//       "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980245544.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aufcZ33IL4RB5BSE5kgvHRJeYFBd4hvQMbRR9OYv92itFIjHz%2B%2BctwqqsM4WXoX84YUh6%2FdhLhyzn2kha6%2FWwFF%2Bai59wq5sAVHhJsP8LHDQ4CFUcLUafF2u98hnzYqqzoYzapaAe%2FGT%2FTuW6N%2BUNaows%2BpHfDVFdoNbUbDeyW%2Bm8%2BbiEailHe0nelqRSUKf0bvJry9uUpvIsppKdFQZGEolDQCBL11i7NcuUvwKBCdyVOHWbS7uDt4ULhXlwIzGztux9O%2Fng9eV2JPzGzeX1tT3L%2FcTcwKu%2BUthuRyhkx4CJEe%2BO1dyNX3FSoUBiRQt0BNtLnbuhofwDHJZ%2F0WTvA%3D%3D"
//     ],
//     is_enabled: 1,
//     origin_price: 200,
//     price: 200,
//     title: "澳洲茶樹精油-5ml",
//     unit: "瓶"
//   }
// ];
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
          to="/products"
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
