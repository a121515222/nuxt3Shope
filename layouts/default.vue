<script setup>
import { useFlowbite } from "@/composables/useFlowbite";
import Toast from "@/components/Toast.vue";
const indexStore = useIndexStore();
const toastStore = useToastStore();
const { addToast } = toastStore;
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
    <button
      class="btn btn-primary text-primary bg-secondary hover:bg-primary hover:text-secondary px-4 py-2 rounded-lg"
      @click="
        addToast({
          type: 'success',
          message: '成功訊息',
          duration: 3000
        })
      "
    >
      test
    </button>
    <Toast></Toast>
    <div :style="`min-height: ${windowHeight - footerHeight * 2}px`">
      <slot />
    </div>
    <Footer></Footer>
    <Cart></Cart>
  </div>
</template>
<style></style>
