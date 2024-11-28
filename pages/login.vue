<script lang="ts" setup>
import { postLogin, postLoginNew } from "@/apis/login";
import { resentVerifyMail } from "@/apis/resentVerifyMail";
import { setCookie } from "@/utils/setCookie";
import { type UserLogin } from "@/types/loginTypes";

const indexStore = useIndexStore();
const { userId } = storeToRefs(indexStore);
const messageStore = useMessageBoxStore();
const { showAlert } = messageStore;
const { isLogin, headerHeight, windowHeight } = storeToRefs(indexStore);
const user = ref<UserLogin>({
  account: "",
  password: ""
});
const isForgotPassword = ref(false);
const router = useRouter();
const handleSendInfo = async () => {
  if (isForgotPassword.value) {
    await handleResendVerifyMail();
  } else {
    await login();
  }
};
const handleResendVerifyMail = async () => {
  if (user.value.account === "") {
    await showAlert("是不是忘了什麼?", "請輸入註冊帳號");
    return;
  } else {
    const res = await resentVerifyMail(user.value.account);
    if (res.status) {
      await showAlert("驗證信已寄出", "請至信箱收取驗證信");
    } else {
      await showAlert("發生錯誤", "請稍後再試");
    }
  }
};
const login = async () => {
  if (user.value.account === "" || user.value.password === "") {
    showAlert("是不是忘了什麼?", "請輸入帳號密碼");
    return;
  } else {
    const res = await postLoginNew(user.value);
    if (process.client) {
      userId.value = res.data.userId;
      setCookie("authorization", res.data.token, 7);
      isLogin.value = true;
      // router.push("/admin/product");
    }
  }
};
const shouldHeight = () => {
  return `min-height:${windowHeight.value - headerHeight.value * 2}px`;
};
const goToSignIn = () => {
  router.push("/signIn");
};
const passwordInputRef = ref();
const toggleShowPassWord = (inputRef: null | HTMLInputElement) => {
  const input = inputRef;
  if (!input) {
    return;
  }
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
};
</script>
<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center" :style="shouldHeight()">
      <div class="w-full max-w-sm mx-6">
        <div class="dark:text-white bg-gray-200 dark:bg-gray-700 shadow-md rounded-lg my-3">
          <div class="p-5">
            <form>
              <div class="mb-4">
                <label for="account" class="block text-gray-700 text-sm font-bold mb-2">帳號</label>
                <input
                  type="email"
                  id="account"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                  placeholder="請輸入帳號(mail)"
                  autocomplete="account"
                  v-model="user.account"
                />
              </div>
              <div class="mb-4 relative" v-if="!isForgotPassword">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
                  >密碼</label
                >
                <input
                  type="password"
                  ref="passwordInputRef"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                  placeholder="請輸入密碼"
                  autocomplete="current-password"
                  v-model="user.password"
                />
                <InputToggle @emitToggleShowPassWord="toggleShowPassWord(passwordInputRef)" />
              </div>
            </form>
          </div>
          <div class="flex justify-end pr-4 mb-2">
            <button
              type="button"
              class="bg-primary hover:opacity-80 mr-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="goToSignIn"
              v-if="!isForgotPassword"
            >
              註冊
            </button>
            <button
              type="button"
              class="bg-primary hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="handleSendInfo"
            >
              {{ isForgotPassword ? "重寄驗證信" : "登入" }}
            </button>
          </div>
          <div class="flex justify-end mb-3 pr-4 text-primary dark:text-secondary">
            <p
              class="hover:cursor-pointer"
              @click="isForgotPassword = !isForgotPassword"
              v-if="!isForgotPassword"
            >
              重寄驗證信/忘記密碼
            </p>
            <p class="hover:cursor-pointer" v-else @click="isForgotPassword = !isForgotPassword">
              登入/註冊
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
