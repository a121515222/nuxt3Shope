<script lang="ts" setup>
import { validateMailPost } from "@/apis/validateMail";
const messageStore = useMessageBoxStore();
const { showAlert } = messageStore;
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const route = useRoute();
const router = useRouter();
const id = ref("");
const verifyToken = ref("");
const verificationResult = ref(null);
const loading = ref(true);
const error = ref(null);
const handleSendInfo = async () => {
  const sendInfo = {
    id: Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
    token: Array.isArray(route.params.token) ? route.params.token[0] : route.params.token
  };
  try {
    isLoading.value = true;
    const res = await validateMailPost(sendInfo);
    if (res.status) {
      await showAlert("驗證成功", "請重新登入");
      router.push("/login");
    } else {
      await showAlert("驗證失敗", "請重新驗證");
    }
  } catch (error) {
    await showAlert("發生錯誤", "請稍後再試");
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  await handleSendInfo();
});
</script>
<template></template>
<style></style>
