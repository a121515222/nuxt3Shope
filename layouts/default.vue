<script setup>
import { useFlowbite } from "@/composables/useFlowbite";
const indexStore = useIndexStore();
const { windowHeightListener, removeWindowHeightListener } = indexStore;
const { footerHeight, windowHeight, isDarkMode, headerHeight } = storeToRefs(indexStore);
onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  });
  windowHeightListener();
});
const headerHeightComputed = computed(() => {
  return headerHeight.value;
});
onUnmounted(() => {
  removeWindowHeightListener();
});
</script>
<template>
  <div
    class="bg-gray-300 dark:bg-gray-800 relative"
    :class="{ dark: isDarkMode }"
    :style="{ paddingTop: headerHeightComputed + 'px' }"
  >
    <Header></Header>
    <div :style="`min-height: ${windowHeight - footerHeight * 2}px`">
      <slot />
    </div>
    <Footer></Footer>
    <Cart></Cart>
  </div>
</template>
<style></style>
