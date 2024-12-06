<script setup>
import Toast from "@/components/Toast.vue";
import MessageBox from "~/components/MessageBox.vue";
import { postCheckLoginNew } from "@/apis/login";
const indexStore = useIndexStore();
const { windowHeightListener, removeWindowHeightListener } = indexStore;
const { footerHeight, windowHeight, isDarkMode, headerHeight, isLogin, userId } =
  storeToRefs(indexStore);
const route = useRoute();
const handleCheckLogin = async () => {
  // 如果是admin的路由，就檢查是否登入
  if (route.path.includes("/admin")) {
    let id = "";
    if (process.client) {
      id = localStorage.getItem("userId") ?? "";
    }
    if (!id) {
      router.push("/login");
      return;
    }
    const res = await postCheckLoginNew(id);
    if (res.status) {
      isLogin.value = true;
      userId.value = id;
    } else {
      isLogin.value = false;
      router.push("/login");
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
