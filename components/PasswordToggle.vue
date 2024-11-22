<template>
  <svg
    v-if="!isShowPassword"
    class="w-6 h-6 text-gray-800 dark:text-white absolute cursor-pointer z-10"
    :style="dynamicStyle"
    @click="toggleShowPassWord"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-width="2"
      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
    />
    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>

  <svg
    v-if="isShowPassword"
    class="w-6 h-6 text-gray-800 dark:text-white absolute cursor-pointer z-10"
    :style="dynamicStyle"
    @click="toggleShowPassWord"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
</template>

<script lang="ts" setup>
// 接收父组件传递的右侧和底部位置参数
interface Props {
  right?: string;
  bottom?: string;
}
const props = withDefaults(defineProps<Props>(), {
  right: "2",
  bottom: "4"
});
const emit = defineEmits(["emitToggleShowPassWord"]);
const isShowPassword = ref(false);

// 切换密码显示/隐藏状态
const toggleShowPassWord = () => {
  isShowPassword.value = !isShowPassword.value;
  emit("emitToggleShowPassWord");
};
const tailwindSpaceUnit = 2; // 1 space unit = 2px
const dynamicStyle = computed(() => {
  const rightValue = Number(props.right) || 0; // 如果轉換失敗，設置為 0
  const bottomValue = Number(props.bottom) || 0; // 如果轉換失敗，設置為 0
  return `right:${rightValue * tailwindSpaceUnit}px; bottom:${bottomValue * tailwindSpaceUnit}px;`;
});
</script>

<style scoped>
/* 你可以添加自定义的样式 */
</style>
