<script lang="ts" setup>
const indexStore = useIndexStore();
const { scrollY, headerHeight } = storeToRefs(indexStore);
const bannerConfig = {
  duration: 6000,
  imagesPath: [
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652259953185.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SiEnRDMhsYt%2Bv98iDemtQRTjL5WG1Y0AuxwgZTiJM9FU9q5WTzkpjB0xkghzcPVGEEaLChFR6uAe2TI59nQJhoBoKcK3kW64YleYC9ITfDZdMHe9M833Kzd7t0lAS5UCR0h8tUNbQnmoWh9JbfnjM3Pf%2BYvc14e912vBgKGL6oesX6rjTfk79S%2FiX2aVszTSf3D3mEWZZ%2BXtyPwghbBFjl7n2BoEtzXFIk%2B%2B49mcbgbHWw%2FMpoeTNfSFKYK4qVoVSoXrC15wVoB3FReLzSLHupyGPMzcPi0qKb51HyBoLmFznvTxymoOUHBP%2FawPbQ9o7%2BkdHsDioaGbJwIGt29gnA%3D%3D",
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260184963.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=juhYb%2FKhH1KWiij7g9tU4voNPdpyDTZtNIv49R0W8554DsSBmkqci3Bd0iOp250NMR1sMgGB9coee80SJ0CeoP%2FaKesb5SotKZRVvl1W56ym6G3W1mCYMU4WORjT5Zqeny0%2Bao0hOZXCXQg4S5T6oJh6XksRjeOg8ilCL0FePTOhhjoejsTmRCKycmaUSoS7VismMPvDu8B6c7apgFESWGM59dKlu60M%2Bome3hvsJsUwpvXnShhKQ6h4oj56jpirqMxczxE5joTagHYbNZYeMxcG%2Bzl64vMu%2Fz%2F4%2FnI0XgLmXOG%2FdjWNGZ0fzsoRK3UPMA6lydQAJifWw3afW4FoSg%3D%3D",
    "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1652260045306.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YG9ZpKhC%2F9WFYAlqCTDJ1sijGMTONgAeEG2DFkI6Z%2FssrMX968TP075wxK8G3%2FBmRp9IkMJrVNDqkRVjY5zjar1wGhlCHUtDqKX%2FAnYAEJEyZjg9N8BcyoztpPgw5RP90kzY8eqrtrA3uKHR0kVX3yNoauNbXQX1OJ67Mtc9hG2fj%2FiXhP%2BIxkiCxbQ9f5OeCJaxLzkwnyNJxmcNvTfM23XfN3YL8nTih61uvwrBZtAK%2Bknuh%2F1%2BlyE5VrXKmB%2BiIAAxe6dcoqcPzwOppiPonf7VYB8PNNeLRxITXkHHtz4Q3IczUeusPo1LPXx3Rz0blmpSSqQOJEX17FeH7D7aiw%3D%3D"
  ]
};
const screnHeight = ref(0);
// 設定圖片切換狀態
const currentImageIndex = ref(0);
const bannerHeight = ref(0);
// 切換圖片
const switchImages = () => {
  const images = bannerImages.value?.children;
  if (!images) return;
  // 把NodeList轉成Array
  Array.from(images).forEach((list, index) => {
    if (currentImageIndex.value === index) {
      images[index].classList.remove("opacity-0");
      images[index].classList.add("opacity-100");
      getBannerHeight(images[index]);
    } else {
      images[index].classList.remove("opacity-100");
      images[index].classList.add("opacity-0");
    }
  });
  currentImageIndex.value =
    (currentImageIndex.value + 1) % bannerConfig.imagesPath.length;
};
const getBannerHeight = (banner: Element) => {
  bannerHeight.value = (banner as HTMLElement).clientHeight;
};

let intervalId: ReturnType<typeof setInterval> | null = null;
const bannerImages: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  // 每隔設定的時間切換一次圖片
  intervalId = setInterval(switchImages, bannerConfig.duration);

  screnHeight.value = window.innerHeight;
});

onUnmounted(() => {
  // 清除計時器
  if (intervalId) clearInterval(intervalId);
});
</script>
<template>
  <ClientOnly>
    <div
      class="flex justify-center items-center w-full"
      :style="`min-height:${bannerHeight}px`"
    >
      <ul
        class="w-full h-full px-0 static transition-all ease-linear duration-700"
        ref="bannerImages"
        :class="scrollY > 10 ? `absolute top-[${headerHeight}px] w-9/10` : ''"
      >
        <li
          v-for="(image, index) in bannerConfig.imagesPath"
          class="transition-opacity duration-[6s] w-full h-full absolute top-0 left-1/2 -translate-x-1/2"
        >
          <img
            :src="image"
            alt="bannerPicture"
            class="w-full h-full object-cover object-center"
          />
        </li>
      </ul>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col"
      >
        <slot name="bannerSlogan"></slot>
        <slot name="bannerBtn"></slot>
      </div>
      <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2"
        :class="scrollY > 10 ? 'opacity-0' : 'opacity-100'"
      >
        <svg
          class="w-10 h-10 text-secondary animate-scrollDown"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </ClientOnly>
</template>
<style></style>
