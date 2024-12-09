<script lang="ts" setup>
// 接收父组件传递的右侧和底部位置参数
interface Props {
  right?: string;
  bottom?: string;
  operate?: string;
}
// const props = withDefaults(defineProps<Props>(), {
//   right: "2",
//   bottom: "4",
//   operate: "password"
// });

const { right = "2", bottom = "4", operate = "password" } = defineProps<Props>();

const emit = defineEmits(["emitToggleShowPassWord", "emitToggleEdit"]);
const isShowPassword = ref(false);
const toggleIcon = ref(false);
// 切换密码显示/隐藏状态
const toggleShowPassWord = () => {
  isShowPassword.value = !isShowPassword.value;
  emit("emitToggleShowPassWord");
};
// 切换编辑状态
const toggleEdit = () => {
  toggleIcon.value = !toggleIcon.value;
  emit("emitToggleEdit");
};
const tailwindSpaceUnit = 2; // 1 space unit = 2px
const dynamicStyle = computed(() => {
  const rightValue = Number(right) || 0; // 如果轉換失敗，設置為 0
  const bottomValue = Number(bottom) || 0; // 如果轉換失敗，設置為 0
  return `right:${rightValue * tailwindSpaceUnit}px; bottom:${bottomValue * tailwindSpaceUnit}px;`;
});
</script>

<template>
  <div v-if="operate === 'password'">
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
  </div>
  <div v-else-if="operate === 'edit'">
    <svg
      v-if="!toggleIcon"
      class="w-6 h-6 text-gray-800 dark:text-white absolute cursor-pointer z-10"
      :style="dynamicStyle"
      @click="toggleEdit"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
        clip-rule="evenodd"
      />
    </svg>
    <svg
      v-if="toggleIcon"
      class="w-6 h-6 text-gray-800 dark:text-white absolute cursor-pointer z-10"
      @click="toggleEdit"
      :style="dynamicStyle"
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
        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
      />
    </svg>
  </div>
</template>

<style scoped>
/* 你可以添加自定义的样式 */
</style>
