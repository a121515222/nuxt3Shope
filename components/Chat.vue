<script lang="ts" setup>
const indexStore = useIndexStore();
const chatStore = useChatStore();
const { chatDataList, isShowChat } = storeToRefs(chatStore);
const { isMainBannerIntersection, isLogin, isLoading } = storeToRefs(indexStore);
const messageBoxStore = useMessageBoxStore();
const { showConfirm } = messageBoxStore;
const { addToast } = useToastStore();
const chatRef = ref<HTMLElement | null>(null);
const subChatRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
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
const chatContainerRef = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);
const isScrollable = ref(false);
const users = ref(["user1", "user2", "user3"]);
const selectedUser = ref<keyof CheatMessage>("user1");
interface Message {
  sender: string;
  text: string;
}

interface CheatMessage {
  [key: string]: Message[];
}

const cheatMessage = ref<CheatMessage>({
  user1: [
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" },
    { sender: "me", text: "hello user1" },
    { sender: "user1", text: "hey" }
  ],
  user2: [
    { sender: "me", text: "hello user2" },
    { sender: "user2", text: "hey" }
  ],
  user3: [
    { sender: "me", text: "hello user3" },
    { sender: "user3", text: "hey" }
  ]
});
const messages = ref({
  user1: cheatMessage.value,
  user2: cheatMessage.value,
  user3: cheatMessage.value
});
const newMessage = ref("");
const sendMessage = () => {
  if (selectedUser.value) {
    cheatMessage.value[selectedUser.value].push({ sender: "me", text: "hello user1" });
  }
};
const selectUser = (user: any) => {
  selectedUser.value = user;
};
const getChatWidth = () => {
  if (chatRef.value) {
    return chatRef.value.offsetWidth;
  }
  return 0;
};
const toggleChat = () => {
  isShowChat.value = !isShowChat.value;
};
const chatClose = () => {
  isShowChat.value = false;
};
const isShowChatButton = ref(false);
const route = useRoute();
const shouldShowChatButton = () => {
  if (route.name === "index") {
    isShowChatButton.value = !isMainBannerIntersection.value;
  } else if (/product(List)?/.test(route.path)) {
    isShowChatButton.value = true;
  } else {
    isShowChatButton.value = false;
  }
};

const router = useRouter();
const setupObserver = () => {
  // 如果已有 observer，先斷開連接，避免重複設置
  if (observer.value) {
    observer.value.disconnect();
  }
  observer.value = new IntersectionObserver(
    (entries) => {
      isScrollable.value = !entries[0].isIntersecting;
    },
    { threshold: 1.0 }
  );
  const observerTarget = document.querySelector(".observer");
  if (observerTarget) {
    observer.value.observe(observerTarget);
  } else {
    console.error("observerTarget (.observer) not found");
  }
};
watch(selectedUser, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    setupObserver();
  }
});
onMounted(async () => {
  chatWidth.value = getChatWidth();
  shouldShowChatButton();
  if (typeof window !== "undefined") {
    updateChatHeight();
    window.addEventListener("resize", updateChatHeight);
  }
  setupObserver();
});
onUnmounted(() => {
  window.removeEventListener("resize", updateChatHeight);
  if (observer.value) {
    observer.value.disconnect();
  }
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
    <span
      v-show="chatDataList.length !== 0"
      class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300"
      >{{ chatDataList.length }}</span
    >
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
            v-for="(user, index) in users"
            :key="user"
            class="p-2 rounded hover:bg-secondary hover:text-primary"
            :class="{
              'bg-secondary text-primary': selectedUser === users[index],
              'bg-primary text-secondary': selectedUser !== users[index]
            }"
            @click="selectUser(users[index])"
          >
            {{ user }}
          </button>
        </div>

        <!-- 右側聊天區域 -->
        <div
          class="col-span-3 md:col-span-4 flex flex-col rounded"
          :style="{ height: `${chatHeight}px` }"
        >
          <!-- 聊天内容（可滚动区域） -->
          <div
            class="flex-1 overflow-y-auto rounded bg-gray-300 dark:bg-gray-600 dark:text-white p-2 w-full no-scrollbar"
            ref="chatContainerRef "
          >
            <div v-for="(message, index) in cheatMessage[selectedUser]" :key="index" class="mb-2">
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
            <div class="observer"></div>
            <p v-if="isScrollable" class="sticky bottom-0 left-0 text-center w-full bg-third">
              尚有對話
            </p>
          </div>

          <!-- 输入框（始终固定在底部） -->
          <div class="flex gap-2 p-2 bg-white dark:bg-gray-800">
            <input
              v-model="newMessage"
              class="flex-grow border p-2 rounded"
              placeholder="输入消息..."
            />
            <button
              class="p-2 bg-primary hover:bg-secondary text-secondary hover:text-primary rounded"
              @click="sendMessage"
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
