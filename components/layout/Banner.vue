<script lang="ts" setup>
const indexStore = useIndexStore();
const { scrollY, headerHeight, isMainBannerIntersection } = storeToRefs(indexStore);

interface BannerConfig {
  bannerConfigProp: {
    duration?: number;
    imagesPath: string[];
    bannerHeight?: string;
    isMainBanner: boolean;
    style?: string[];
  };
}
const { bannerConfigProp } = defineProps<BannerConfig>();
const screenHeight = ref(0);
// 設定圖片切換狀態
const currentImageIndex = ref(0);
const bannerHeight = ref(0);
// 切換圖片
const switchImages = () => {
  const images = bannerImages.value?.children;
  if (!images) return;
  if (bannerConfigProp.imagesPath.length <= 1) {
    // 只有一張圖片時不切換, 直接顯示
    images[0].classList.remove("opacity-0");
    images[0].classList.add("opacity-100");
    // getBannerHeight(images[0]);
  } else {
    // 把NodeList轉成Array
    Array.from(images).forEach((list, index) => {
      if (currentImageIndex.value === index) {
        images[index].classList.remove("opacity-0");
        images[index].classList.add("opacity-100");
        // getBannerHeight(images[index]);
      } else {
        images[index].classList.remove("opacity-100");
        images[index].classList.add("opacity-0");
      }
    });
    currentImageIndex.value = (currentImageIndex.value + 1) % bannerConfigProp.imagesPath.length;
  }
};
const getBannerHeight = (banner: Element) => {
  bannerHeight.value = (banner as HTMLElement).clientHeight;
};

let intervalId: ReturnType<typeof setInterval> | null = null;
const bannerImages: Ref<HTMLElement | null> = ref(null);
const updateScreenHeight = () => {
  screenHeight.value = window.innerHeight;
};
const shouldHeight = () => {
  if (bannerConfigProp.isMainBanner) {
    return `min-height:${screenHeight.value - headerHeight.value}px`;
  } else {
    return `min-height:${bannerConfigProp.bannerHeight}px`;
  }
};
const { isIntersecting, interSectionObserver } = useInterSectionObserver();
const bannerRef = ref<HTMLElement | null>(null);
// 主banner監聽是否進入畫面
watch(isIntersecting, (value) => {
  if (bannerConfigProp.isMainBanner) {
    isMainBannerIntersection.value = value;
  }
});
onMounted(() => {
  // 每隔設定的時間切換一次圖片
  intervalId = setInterval(switchImages, bannerConfigProp.duration);
  updateScreenHeight();
  // 當視窗大小改變時重新計算高度
  window.addEventListener("resize", updateScreenHeight);
  // 監聽是否進入畫面

  nextTick(() => {
    if (bannerRef.value && bannerConfigProp.isMainBanner) {
      interSectionObserver(bannerRef.value); // 直接傳 DOM 元素
    }
  });
});

onUnmounted(() => {
  // 清除計時器
  if (intervalId) clearInterval(intervalId);
  // 移除resize事件
  window.removeEventListener("resize", updateScreenHeight);
});
</script>
<template>
  <ClientOnly>
    <div
      class="flex justify-center items-center w-full relative"
      ref="bannerRef"
      :style="shouldHeight()"
    >
      <ul
        class="w-full px-0 relative transition-all ease-linear duration-700 overflow-hidden"
        ref="bannerImages"
        :style="shouldHeight()"
      >
        <li
          v-for="(image, index) in bannerConfigProp.imagesPath"
          :key="index + image"
          class="transition-opacity duration-[6s] w-full absolute top-0 left-1/2 -translate-x-1/2 bg-cover bg-center"
          :class="
            bannerConfigProp.isMainBanner
              ? 'bg-cover bg-center'
              : `${bannerConfigProp.style?.[index] ?? ''}`
          "
          :style="`${shouldHeight()}; background-image: url(${image})`"
        ></li>
      </ul>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col"
      >
        <slot name="bannerSlogan"></slot>
        <slot name="bannerBtn"></slot>
      </div>
      <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 -translate-y-1/2"
        :class="
          bannerConfigProp.isMainBanner
            ? scrollY > 10
              ? 'opacity-0'
              : 'opacity-100'
            : 'opacity-100'
        "
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
