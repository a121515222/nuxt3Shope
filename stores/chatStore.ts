import type { ChatIdUsersDataMapType } from "@/types/conversationTypes";
import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
interface ChatDataList {
  message: string;
  userId: string;
  toUserId: string;
  name: string;
  date?: Date | string;
}
export interface MessageType {
  sender: "me" | string;
  text: string;
  timestamp?: string;
  isRead?: boolean;
}

interface CheatMessage {
  [key: string]: {
    message: MessageType[];
    messageTimestamp: string;
  }
}

interface KeyValuePair {
  [key: string]: string;
}
interface MsgType {
  toUserId: string;
  userId: string;
  name: string;
  message: string;
  chatId: string;
  error?: string;
  date?: Date | string;
}
export const useChatStore = defineStore("chatStore", () => {
  const indexStore = useIndexStore();
  const { isLogin, userId: indexUserId } = storeToRefs(indexStore);
  const { $socket } = useNuxtApp();
  const selectedUserId = computed(() => {
    if (selectedChatId.value) {
      const filteredIds = selectedChatId.value.split("-").filter((id) => id !== indexUserId.value);
      return filteredIds[0] || "";
    } else {
      return "";
    }
  });
  const nameDecide = (chatMember: KeyValuePair) => {
    const userIds = Object.keys(chatMember);
    const decideId = userIds.find((id) => id !== indexUserId.value) || "";
    return chatMember[decideId];
  };
  const userIdDecide = (chatMember: KeyValuePair) => {
    const userIds = Object.keys(chatMember);
    const decideId = userIds.find((id) => id !== indexUserId.value) || "";
    return decideId;
  };
  const selectedChatId = ref("");
  const chatDataList = ref<ChatDataList[]>([]);
  const newMessage = ref("");
  const isShowChat = ref(false);
  const chatIdUsersDataMap = ref<ChatIdUsersDataMapType>({});
  const cheatMessageData = ref<CheatMessage>({});
  const isOnline = ref(true);
  // 發送私聊消息
  const chatSomeone = () => {
    const toUserId = selectedUserId.value;
    const reverseChatId = `${toUserId}-${localStorage.getItem("userId")}`;
    const socketData: {
      message?: string;
      userId?: string;
      name?: string;
      toUserId?: string;
      chatId?: string;
    } = {};
    if (!cheatMessageData.value[selectedChatId.value] && !cheatMessageData.value[reverseChatId]) {
      // 如果沒有這個chatId，就要新增一個
      cheatMessageData.value[selectedChatId.value] = { message: [], messageTimestamp: "" };
      socketData.message = newMessage.value;
      socketData.userId = localStorage.getItem("userId") ?? "";
      socketData.name = localStorage.getItem("userName") ?? "";
      socketData.toUserId = toUserId;
      socketData.chatId = selectedChatId.value;
    } else {
      socketData.message = newMessage.value;
      socketData.userId = localStorage.getItem("userId") ?? "";
      socketData.name = localStorage.getItem("userName") ?? "";
      socketData.toUserId = toUserId;

      // 檢查chatId chatId 組成是 userId-toUserId
      // 代表 userId是發送方，toUserId是接收方
      // 如果chatId不是這樣組成，就要反轉
      // 如果本身的userId 不是發送方，就要反轉
      if (selectedChatId.value !== `${localStorage.getItem("userId")}-${toUserId}`) {
        socketData.chatId = reverseChatId;
      } else {
        socketData.chatId = selectedChatId.value;
      }
    }
    $socket.emit("chatSomeone", socketData);
    newMessage.value = "";
  };

  // 连接 WebSocket
  const connectBackEnd = () => {
    if (!$socket) {
      console.error("WebSocket未初始化！");
      return;
    }
    $socket.connect();
  };
  const disconnectBackEnd = () => {
    if (!$socket) {
      console.error("WebSocket未初始化！");
      return;
    }
    $socket.disconnect();
  };
  const initWebSocket = () => {
    if (!$socket) {
      console.error("WebSocket未初始化！");
      return;
    }
    // 接收私聊消息
    $socket.on("receiveChat", (msg: MsgType) => {
      const { userId, name, message, toUserId, chatId, error } = msg;
      if (!chatIdUsersDataMap.value[chatId]) {
        chatIdUsersDataMap.value[chatId] = {
          participantId: localStorage.getItem("userId") === userId ? userId : toUserId,
          participantName: name ?? "",
          isParticipantOnline: true,
          unreadCount: 0,
          lastMessageTime: new Date().toISOString()
        };
      } else {
        chatIdUsersDataMap.value[chatId].isParticipantOnline = true;
      }
      if (!cheatMessageData.value[chatId]) {

        cheatMessageData.value[chatId] = { message: [], messageTimestamp: "" };
      }
      if (message) {
        cheatMessageData.value[chatId].message.push({
          text: message,
          sender: userId === localStorage.getItem("userId") ? "me" : name
        });
      }
      if (error === "對方不在線上") {
        chatIdUsersDataMap.value[chatId].isParticipantOnline = false;
      }
    });
  };
  // 重新整理的時候，重新連接 WebSocket
  watch(isLogin, (value) => {
    if (value) {
      connectBackEnd();
      initWebSocket();
    }
    if (!value) {
      if ($socket) {
        $socket.disconnect();
      }
    }
  });
  onMounted(() => {
    if (isLogin.value) {
      connectBackEnd();
      initWebSocket();
    }
  });

  // 组件销毁时清理 WebSocket 事件
  onUnmounted(() => {
    if ($socket) {
      $socket.off("receiveMessage");
      $socket.off("receiveChat");
      $socket.off("connect");
    }
  });

  return {
    selectedUserId,
    selectedChatId,
    chatIdUsersDataMap,
    chatDataList,
    newMessage,
    isShowChat,
    cheatMessageData,
    isOnline,
    chatSomeone,
    connectBackEnd,
    disconnectBackEnd,
    nameDecide,
    userIdDecide
  };
});
