<script lang="ts" setup>
import type { CommentDataType } from "@/types/commentTypes";

const commentData = defineModel<CommentDataType>({
  type: Object,
  default: () => ({
    comment: "",
    score: 0,
    _id: ""
  })
});
const emit = defineEmits(["sendComment"]);
const hoverScore = ref(0);
const isComment = ref(false);
const isDisableSendCommit = computed(() => {
  return !commentData.value.comment || commentData.value.score === 0;
});
const handleScoreUpdate = (score: number) => {
  // 更新整個 commentData 在defineModel中只更新commentData.value內的屬性不會馬上響應在畫面上
  commentData.value = {
    ...commentData.value,
    score: score
  };
};
const handleComment = () => {
  // 更新整個 commentData 在defineModel中只更新commentData.value內的屬性不會馬上響應在畫面上
  commentData.value = {
    ...commentData.value
  };
};
const handleSendComment = () => {
  emit("sendComment");
};
watch(
  commentData,
  (newVal) => {
    if (newVal._id) {
      isComment.value = true;
    } else {
      isComment.value = false;
    }
  },
  {
    immediate: true,
    deep: true
  }
);
</script>
<template>
  <div class="order-comment flex flex-col space-y-4">
    <div class="flex space-x-2">
      <div
        v-for="i in 5"
        :key="i"
        class="cursor-pointer"
        @mouseover="hoverScore = i"
        @mouseleave="hoverScore = 0"
        @click="handleScoreUpdate(i)"
      >
        <!-- 空星 -->
        <svg
          v-if="hoverScore < i && commentData.score < i"
          class="w-6 h-6 text-gray-400 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
          />
        </svg>
        <!-- 實星 -->
        <svg
          v-if="hoverScore >= i || commentData.score >= i"
          class="w-6 h-6 text-yellow-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
          />
        </svg>
      </div>
    </div>
    <textarea
      v-model="commentData.comment"
      class="w-full h-24 p-2 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 dark:placeholder-gray-400 dark:text-white bg-gray-100 dark:bg-gray-700"
      placeholder="請輸入評論"
      @change="handleComment"
    ></textarea>
    <div class="flex flex-row-reverse">
      <button
        class="ml-4 bg-primary text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50 text-nowrap disabled:cursor-not-allowed"
        type="button"
        :disabled="isDisableSendCommit"
        @click="handleSendComment"
      >
        送出
      </button>
    </div>
  </div>
</template>
<style></style>
