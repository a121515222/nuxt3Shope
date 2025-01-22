<script setup>
import Toast from "@/components/Toast.vue";
import MessageBox from "~/components/MessageBox.vue";
import { postCheckLoginNew } from "@/apis/login";
const indexStore = useIndexStore();
const { windowHeightListener, removeWindowHeightListener } = indexStore;
const { footerHeight, windowHeight, isDarkMode, headerHeight, isLogin, userId } =
  storeToRefs(indexStore);
const router = useRouter();
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
  if (process.client) {
    id = localStorage.getItem("userId") ?? "";
  }
  if (process.client) {
    const cookieData = document.cookie.split("; ");
    if (!cookieData[0]) {
      return;
    } else {
      const res = await postCheckLoginNew(id);
      if (res.status) {
        isLogin.value = true;
        userId.value = id;
      } else {
        isLogin.value = false;
        router.push("/login");
      }
    }
  }
};

onMounted(async () => {
  windowHeightListener();
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
    <Cart></Cart>
  </div>
</template>
<style></style>
