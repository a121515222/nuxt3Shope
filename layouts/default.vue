<script setup>
import { useFlowbite } from "@/composables/useFlowbite";
import Toast from "@/components/Toast.vue";
import MessageBox from "~/components/MessageBox.vue";
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
    <LayoutHeader></LayoutHeader>
    <Toast></Toast>
    <MessageBox></MessageBox>
    <div :style="`min-height: ${windowHeight - footerHeight * 2}px`">
      <slot />
    </div>
    <LayoutFooter></LayoutFooter>
    <Cart></Cart>
  </div>
</template>
<style></style>
