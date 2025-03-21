<script setup>
import Toast from "@/components/Toast.vue";
import MessageBox from "@/components/MessageBox.vue";
import { postCheckLoginNew } from "@/apis/login";
import { clearCookie } from "@/utils/cookie";
const indexStore = useIndexStore();

const { windowHeightListener, removeWindowHeightListener } = indexStore;
const {
  isMainBannerIntersection,
  footerHeight,
  windowHeight,
  isDarkMode,
  headerHeight,
  isLogin,
  userId,
  userName
} = storeToRefs(indexStore);
const router = useRouter();
const route = useRoute();
const isShowFunctionButtons = ref(false);
const handleGoogleAuth = () => {
  let cookieUserId;
  if (process.client) {
    const cookieData = document.cookie.split("; ");
    if (cookieData.length > 1) {
      cookieUserId = cookieData.find((row) => row.startsWith("userId=")).split("=")[1];
    } else {
      return;
    }

    if (process.client) {
      if (cookieUserId) {
        userId.value = cookieUserId;
        localStorage.setItem("userId", userId.value);
      }
    }
  }
};
const handleCheckLogin = async () => {
  handleGoogleAuth();
  let id = "";
  let name = "";
  if (process.client) {
    id = localStorage.getItem("userId") ?? "";
    name = localStorage.getItem("userName") ?? "";
  }
  if (process.client) {
    const cookieData = document.cookie.split("; ");
    if (!cookieData[0]) {
      return;
    } else {
      const res = await postCheckLoginNew(id);
      if (res.status) {
        isLogin.value = true;
        // 把存到localStorage的userId與userName再寫回indexstore
        userId.value = id;
        userName.value = name;
      } else {
        isLogin.value = false;
        clearCookie("authorization");
        localStorage.removeItem("userId");
        router.push("/login");
      }
    }
  }
};
const shouldShowFunctionButtons = () => {
  if (route.name === "index" || route.name === "product-id" || route.name === "productList") {
    console.log("isMainBannerIntersection", isMainBannerIntersection.value);
    isShowFunctionButtons.value = !isMainBannerIntersection.value;
  } else {
    isShowFunctionButtons.value = false;
  }
};

watch(isMainBannerIntersection, () => {
  shouldShowFunctionButtons();
});

onMounted(async () => {
  windowHeightListener();
  shouldShowFunctionButtons();
  if (process.client) {
    await handleCheckLogin();
  }
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
    <Loading></Loading>
    <Toast></Toast>
    <MessageBox></MessageBox>
    <div :style="`min-height: ${windowHeight - footerHeight - headerHeight}px`">
      <slot />
    </div>
    <LayoutFooter></LayoutFooter>

    <ClientOnly>
      <div v-show="isShowFunctionButtons">
        <Cart></Cart>
        <Chat></Chat>
      </div>
    </ClientOnly>
  </div>
</template>
<style></style>
