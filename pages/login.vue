<script lang="ts" setup>
import { postLogin } from "@/apis/login";
import { type UserLogin } from "@/types/loginTypes";
const indexStore = useIndexStore();
const { isLogin, headerHeight, windowHeight } = storeToRefs(indexStore);
const user = ref<UserLogin>({
  username: "",
  password: ""
});
const router = useRouter();
const login = async () => {
  if (user.value.username === "" || user.value.password === "") {
    return;
  } else {
    const res = await postLogin(user.value);
    if (process.client) {
      // cookie 好像沒辦法存時間
      // document.cookie = `token=${res.token}; expires= ${new Date(res.expired)};`;
      document.cookie = `token=${res.token}; `;
      isLogin.value = true;
      router.push("/admin/product");
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
                  autocomplete="username"
                  v-model="user.username"
                />
              </div>
              <div class="mb-4 relative">
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
                <PasswordToggle @emitToggleShowPassWord="toggleShowPassWord(passwordInputRef)" />
              </div>
            </form>
          </div>
          <div class="flex justify-end mb-3">
            <button
              type="button"
              class="bg-primary hover:opacity-80 mr-4 mb-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="goToSignIn"
            >
              註冊
            </button>
            <button
              type="button"
              class="bg-primary hover:opacity-80 mr-4 mb-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="login"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
