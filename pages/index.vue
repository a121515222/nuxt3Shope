<script lang="ts" setup>
onMounted(() => {
  // 每隔設定的時間切換一次圖片
});

onUnmounted(() => {});
</script>
<template>
  <Banner>
    <template #bannerSlogan>
      <p
        class="text-5xl text-secondary font-bold text-shadow shadow-black whitespace-nowrap"
      >
        想體驗新鮮的農產品嗎?
      </p>
    </template>
    <template #bannerBtn>
      <div class="flex flex-row justify-center">
        <NuxtLink
          to="/products"
          class="text-2xl text-primary bg-secondary hover:bg-white hover:text-orange-500 rounded-lg px-4 py-2 mt-4"
        >
          立即了解
        </NuxtLink>
      </div>
    </template>
  </Banner>
  <div class="container mx-auto h-screen">
    <p>test content</p>
    <p>test content</p>
    <p>test content</p>
    <p>test content</p>
    <p>test content</p>
    <p>test content</p>
    <p>test content</p>
  </div>
  <div class="container mx-auto h-screen"></div>
</template>
<style></style>
