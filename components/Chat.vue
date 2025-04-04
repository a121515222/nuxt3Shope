<script lang="ts" setup>
import type { ConversationType, ChatIdUsersDataMapType } from "@/types/conversationTypes";
import type { ChatMessageType } from "@/types/chatMessageTypes";
import type { MessageType } from "@/stores/chatStore";
import { getConversationList } from "@/apis/conversationAPI";
import { getChatMessage } from "@/apis/chatMessageAPI";
const indexStore = useIndexStore();
const chatStore = useChatStore();
const { interSectionObserver, isIntersecting, unObserver } = useInterSectionObserver();
const { chatSomeone, connectBackEnd, nameDecide } = chatStore;
const { selectedChatId, chatIdUsersDataMap, cheatMessageData, isShowChat, newMessage, isOnline } =
  storeToRefs(chatStore);
const { isMainBannerIntersection, isLogin } = storeToRefs(indexStore);
const messageBoxStore = useMessageBoxStore();
const { showConfirm } = messageBoxStore;
const { addToast } = useToastStore();
const chatRef = ref<HTMLElement | null>(null);
const subChatRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const interSectionObserverRef = ref<HTMLElement | null>(null);
const chatHeight = ref(0);
const chatWidth = ref(0);
const updateChatHeight = () => {
  if (chatRef.value && titleRef.value && subChatRef.value) {
    const chatStyles = window.getComputedStyle(chatRef.value);
    const chatPaddingTop = parseFloat(chatStyles.paddingTop) || 0;
    const chatPaddingBottom = parseFloat(chatStyles.paddingBottom) || 0;

    chatHeight.value =
      window.innerHeight - titleRef.value.clientHeight - chatPaddingTop - chatPaddingBottom;
  } else {
    chatHeight.value = window.innerHeight;
  }
};
const selectChatId = async (chatId: string) => {
  selectedChatId.value = chatId;
  await getChatMessageData(chatId);
};
const getEarlierChat = async () => {
  const chatId = selectedChatId.value;

  if (chatId) {
    const timestamp = cheatMessageData.value[chatId]?.messageTimestamp;
    const chatMessage = await getChatMessage(chatId, timestamp);
    const { data } = chatMessage;

    const earlierChat = handleChatMessage(data.latestMessages);

    cheatMessageData.value[chatId].message = earlierChat.concat(
      cheatMessageData.value[chatId].message
    );
    cheatMessageData.value[chatId].messageTimestamp = data.messageTimestamp;
  }
};
const getChatWidth = () => {
  if (chatRef.value) {
    return chatRef.value.offsetWidth;
  }
  return 0;
};
const getConversationListData = async () => {
  const conversationData = await getConversationList();
  const { data } = conversationData;
  const { conversations } = data;
  if (conversations.length > 0) {
    const conversationMap = conversations.reduce<ChatIdUsersDataMapType>(
      (map, { chatId, participantId, participantName, unreadCount, lastMessageTime }) => {
        map[chatId] = {
          participantId,
          participantName,
          unreadCount,
          lastMessageTime,
          isParticipantOnline: true
        };
        return map;
      },
      {}
    );
    chatIdUsersDataMap.value = conversationMap;
  }
};
const getChatMessageData = async (chatId: string) => {
  // 檢查是否已經有聊天記錄,如果沒有則初始化
  if (!cheatMessageData.value[selectedChatId.value]?.message) {
    cheatMessageData.value[selectedChatId.value] = {
      message: [],
      messageTimestamp: ""
    };
  }
  const chatMessageData = await getChatMessage(chatId);
  const { data } = chatMessageData;

  cheatMessageData.value[selectedChatId.value].message = handleChatMessage(data.latestMessages);
  cheatMessageData.value[selectedChatId.value].messageTimestamp = data.messageTimestamp;
};
const handleChatMessage = (chatMessageData: ChatMessageType[]): MessageType[] => {
  if (!cheatMessageData.value[selectedChatId.value]) {
    cheatMessageData.value[selectedChatId.value] = {
      message: [],
      messageTimestamp: ""
    };
  }
  return chatMessageData.map((data) => {
    const { isRead = false, message = "", receiverName = "", senderId, timestamp = "" } = data;
    return {
      isRead,
      sender: senderId === indexStore.userId ? "me" : receiverName,
      text: message,
      timestamp
    };
  });
};
const toggleChat = async () => {
  isShowChat.value = !isShowChat.value;
  if (isShowChat.value && isLogin.value) {
    await getConversationListData();
  }
};
const chatClose = () => {
  isShowChat.value = false;
};
const isShowChatButton = ref(false);
const route = useRoute();
const shouldShowChatButton = () => {
  if (route.name === "index") {
    isShowChatButton.value = !isMainBannerIntersection.value;
  } else if (/product(List)?/.test(route.path) || /product?/.test(route.path)) {
    isShowChatButton.value = true;
  } else {
    isShowChatButton.value = false;
  }
};

const router = useRouter();
watch(selectedChatId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    interSectionObserver(interSectionObserverRef.value);
  }
});
onMounted(async () => {
  chatWidth.value = getChatWidth();
  shouldShowChatButton();
  if (typeof window !== "undefined") {
    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);
  }
  interSectionObserver(interSectionObserverRef.value);
  if (isLogin.value) {
    await getConversationListData();
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", updateChatHeight);
});
</script>
<template>
  <div
    class="text-center fixed bottom-[108px] lg:bottom-[108px] right-0 transform -translate-x-4 -translate-y-4 md:-translate-x-1/2 md:-translate-y-12 max-h-full"
    v-show="isShowChatButton"
  >
    <button
      class="relative group text-white bg-third focus:ring-4 focus:ring-third rounded-lg text-sm px-3 py-2 :g:px-5 lg:py-2.5"
      type="button"
      @click="toggleChat"
    >
      <svg
        class="w-8 h-8 lg:w-12 lg:h-12 text-secondary group-hover:text-red-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <!-- <span
      v-show="userChatList.length !== 0"
      class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300"
      >{{ userChatList.length }}</span
    > -->
  </div>

  <div
    class="fixed top-0 right-0 z-40 w-full md:w-1/2 h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out bg-gray-200 dark:bg-gray-700 no-scrollbar"
    tabindex="-1"
    ref="chatRef"
    :class="{ [`right-[${chatWidth}px]`]: isShowChat, 'translate-x-full': !isShowChat }"
  >
    <h5 class="text-base font-semibold text-gray-500 dark:text-white" ref="titleRef">私聊</h5>
    <button
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      @click="toggleChat"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div
      class="my-4 overflow-y-auto h-full"
      :style="{ height: `${chatHeight}px` }"
      ref="subChatRef"
    >
      <div class="grid grid-cols-4 md:grid-cols-5 gap-4 px-3 w-full">
        <div class="col-span-1 flex flex-col gap-2">
          <button
            v-for="[chatId, participantData] in Object.entries(chatIdUsersDataMap)"
            :key="chatId"
            class="p-2 rounded hover:bg-secondary hover:text-primary"
            :class="{
              'bg-secondary text-primary': selectedChatId === chatId,
              'bg-primary text-secondary': selectedChatId !== chatId
            }"
            @click="selectChatId(chatId)"
          >
            {{ participantData.participantName }}
          </button>
        </div>

        <!-- 右側聊天區域 -->
        <div
          class="col-span-3 md:col-span-4 flex flex-col rounded"
          :style="{ height: `${chatHeight}px` }"
        >
          <!-- 聊天内容（可滾動區域） -->
          <div
            class="flex-1 overflow-y-auto rounded bg-gray-300 dark:bg-gray-600 dark:text-white p-2 w-full no-scrollbar"
            ref="chatContainerRef "
          >
            <p
              v-if="cheatMessageData[selectedChatId]?.messageTimestamp !== null && selectedChatId"
              class="bg-secondary hover:cursor-pointer text-center"
              @click="getEarlierChat"
            >
              更早對話
            </p>
            <div
              v-for="(message, index) in cheatMessageData[selectedChatId]?.message"
              :key="index"
              class="mb-2"
            >
              <span
                class="font-bold"
                :class="{
                  'text-primary dark:text-secondary': message.sender === 'me',
                  'text-third': message.sender !== 'me'
                }"
              >
                {{ message.sender === "me" ? "我" : message.sender }}:
              </span>
              {{ message.text }}
            </div>
            <div ref="interSectionObserverRef" class="observer-test"></div>
            <div class="sticky bottom-0 left-0 text-center">
              <p
                v-if="!chatIdUsersDataMap[selectedChatId]?.isParticipantOnline && selectedChatId"
                class="w-full bg-red-500 text-white"
              >
                對方不在線上
              </p>

              <p v-if="!isIntersecting" class="bg-third">尚有對話</p>
            </div>
          </div>

          <!-- 輸入消息入框（始终固定在底部） -->
          <div class="flex gap-2 p-2 bg-white dark:bg-gray-800">
            <input
              v-model="newMessage"
              class="flex-grow border p-2 rounded"
              placeholder="輸入消息..."
            />
            <button
              class="p-2 bg-primary hover:bg-secondary text-secondary hover:text-primary rounded"
              @click="chatSomeone()"
            >
              發送
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
