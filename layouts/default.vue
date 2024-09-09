<script setup>
import { useFlowbite } from "~/composables/useFlowbite";
const indexStore = useIndexStore();
const { testData, isDarkMode, headerHeight } = storeToRefs(indexStore);
onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  });
});
const headerHeightComputed = computed(() => {
  console.log("headerHeight.value", headerHeight.value);
  return headerHeight.value;
});
</script>
<template>
  <div
    :class="{ dark: isDarkMode }"
    :style="{ paddingTop: headerHeightComputed + 'px' }"
  >
    <Header></Header>
    <slot />
    <Footer></Footer>
  </div>
</template>
<style></style>
