<script lang="ts" setup>
import type { ForgetPasswordType } from "@/types/forgetPasswordTypes";
import { forgetPasswordPost } from "@/apis/forgetPassword";
const indexStore = useIndexStore();
const messageStore = useMessageBoxStore();
const { showAlert } = messageStore;
const { handleInputStopTextValidate } = useInputValidate();
const { isLoading, headerHeight, windowHeight } = storeToRefs(indexStore);
const router = useRouter();
const route = useRoute();
const forgetPasswordInfo = ref<ForgetPasswordType>({
  password: "",
  confirmPassword: "",
  token: "",
  id: ""
});
const { passwordValidate, confirmPasswordValidate } = useFormValidate();

const handleSendInfo = async () => {
  const isValid = await Promise.all([
    handlePasswordValidate(),
    handleConfirmPasswordValidate()
  ]).then((results) => results.every(Boolean));
  forgetPasswordInfo.value.token = Array.isArray(route.params.token)
    ? route.params.token[0]
    : route.params.token;
  forgetPasswordInfo.value.id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  if (isValid) {
    isLoading.value = true;
    const res = await forgetPasswordPost(forgetPasswordInfo.value);
    if (res.status) {
      await showAlert("密碼重設成功", "請重新登入");
      router.push("/login");
    } else {
      await showAlert("發生錯誤", "請稍後再試");
    }
    try {
    } catch (error) {
      await showAlert("發生錯誤", "請稍後再試");
    } finally {
      isLoading.value = false;
    }
  }
};
const shouldHeight = () => {
  return `min-height:${windowHeight.value - headerHeight.value * 2}px`;
};
const handlePasswordValidate = async () => {
  const result = await passwordValidate(
    forgetPasswordInfo.value.password,
    passwordInputErrorMessageRef.value,
    passwordInputRef.value
  );
  if (forgetPasswordInfo.value.confirmPassword) {
    await handleConfirmPasswordValidate();
  }
  return result;
};
const handleConfirmPasswordValidate = async () => {
  const result = await confirmPasswordValidate(
    forgetPasswordInfo.value.confirmPassword,
    forgetPasswordInfo.value.password,
    confirmPasswordInputErrorMessageRef.value,
    confirmPasswordInputRef.value
  );
  return result;
};
const passwordInputRef = ref();
const passwordInputErrorMessageRef = ref();
const confirmPasswordInputRef = ref();
const confirmPasswordInputErrorMessageRef = ref();
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
          <p class="text-center dark:text-white text-3xl py-4">重新設定密碼</p>
          <div class="p-5">
            <form>
              <div class="mb-4 relative">
                <label
                  for="password"
                  class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  >密碼</label
                >
                <input
                  type="password"
                  ref="passwordInputRef"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                  placeholder="請輸入密碼"
                  autocomplete="current-password"
                  v-model="forgetPasswordInfo.password"
                  @input="(event) => handleInputStopTextValidate(event, handlePasswordValidate)"
                />
                <PasswordToggle @emitToggleShowPassWord="toggleShowPassWord(passwordInputRef)" />
                <p
                  ref="passwordInputErrorMessageRef"
                  class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
                ></p>
              </div>
              <div class="mb-4 relative">
                <label
                  for="password"
                  class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  >確認密碼</label
                >
                <input
                  type="password"
                  ref="newPasswordInputRef"
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                  placeholder="請輸入密碼"
                  autocomplete="current-password"
                  v-model="forgetPasswordInfo.confirmPassword"
                  @input="
                    (event) => handleInputStopTextValidate(event, handleConfirmPasswordValidate)
                  "
                />
                <PasswordToggle
                  @emitToggleShowPassWord="toggleShowPassWord(confirmPasswordInputRef)"
                />

                <p
                  ref="newPasswordInputErrorMessageRef"
                  class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
                ></p>
              </div>
            </form>
          </div>
          <div class="flex justify-end pr-4 pb-2">
            <button
              type="button"
              class="bg-primary hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="handleSendInfo"
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
