import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const chatDataList = ref([]);
  const isShowChat = ref(false);
  return {
    chatDataList,
    isShowChat
  };
});
