<script lang="ts" setup>
import { postLoginNew } from "@/apis/login";
import { resentVerifyMail } from "@/apis/resentVerifyMail";
import { setCookie } from "@/utils/cookie";
import type { UserLogin } from "@/types/loginTypes";
const indexStore = useIndexStore();
const messageStore = useMessageBoxStore();
const { showAlert } = messageStore;
const { userId, isLogin, headerHeight, windowHeight, isLoading } = storeToRefs(indexStore);
const user = ref<UserLogin>({
  account: "",
  password: ""
});
const config = useRuntimeConfig();
const baseApiUrl = config.public.baseApiNew;
const isForgotPassword = ref(false);
const router = useRouter();
const handleSendInfo = async () => {
  if (isForgotPassword.value) {
    try {
      isLoading.value = true;
      await handleResendVerifyMail();
    } catch (error) {
      isLoading.value = false;
      await showAlert("發生錯誤", "請稍後再試");
    } finally {
      isLoading.value = false;
    }
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
      isLoading.value = false;
      await showAlert("驗證信已寄出", "請至信箱收取驗證信");
    } else {
      isLoading.value = false;
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
      localStorage.setItem("userId", res.data.userId);
      userId.value = res.data.userId;
      setCookie("authorization", res.data.token, 7);
      isLogin.value = true;
      router.push("/admin/userInfo");
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
            <a
              type="button"
              class="bg-primary hover:opacity-80 mr-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :href="`${baseApiUrl}/google`"
              v-if="!isForgotPassword"
            >
              <svg
                class="w-6 h-6 text-gray-800 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

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
