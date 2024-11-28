<script lang="ts" setup>
import type { UserInfoDataType } from "@/types/userInfoTypes";
import { genderConfig } from "@/utils/config";
const userInfo = ref<UserInfoDataType>({
  username: "",
  email: "",
  tel: "",
  address: "",
  birthday: "",
  password: "",
  confirmPassword: "",
  gender: null
});
const messageBoxStore = useMessageBoxStore();
const { showConfirm } = messageBoxStore;
const indexStore = useIndexStore();
const { addToast } = useToastStore();
const datePickerRef = ref<HTMLElement | null>(null);
const { showDatePicker, hideDatePicker, formateShowDate } = useDatePicker(datePickerRef);
const { isDarkMode, isLoading } = storeToRefs(indexStore);
const {
  nameValidate,
  emailValidate,
  telValidate,
  addressValidate,
  passwordValidate,
  confirmPasswordValidate
} = useFormValidate();
const { handleInputStopTextValidate } = useInputValidate();
const formateDate = computed(() => {
  if (!userInfo.value.birthday) {
    userInfo.value.birthday = new Date();
  }
  return formateShowDate(userInfo.value.birthday);
});
const handleNameValidate = async () => {
  const result = await nameValidate(
    userInfo.value.username,
    nameInputErrorMessageRef.value,
    nameInputRef.value
  );
  return result;
};
const handleEmailValidate = async () => {
  const result = await emailValidate(
    userInfo.value.email,
    emailInputErrorMessageRef.value,
    emailInputRef.value
  );
  return result;
};
const handleTelValidate = async () => {
  const result = await telValidate(
    userInfo.value.tel,
    telInputErrorMessageRef.value,
    telInputRef.value
  );
  return result;
};
const handleAddressValidate = async () => {
  const result = await addressValidate(
    userInfo.value.address,
    addressInputErrorMessageRef.value,
    addressInputRef.value
  );
  return result;
};
const handlePasswordValidate = async () => {
  const result = await passwordValidate(
    userInfo.value.password,
    passwordInputErrorMessageRef.value,
    passwordInputRef.value
  );
  if (userInfo.value.confirmPassword) {
    await handleConfirmPasswordValidate();
  }
  return result;
};
const handleConfirmPasswordValidate = async () => {
  const result = await confirmPasswordValidate(
    userInfo.value.confirmPassword,
    userInfo.value.password,
    confirmPasswordInputErrorMessageRef.value,
    confirmPasswordInputRef.value
  );
  return result;
};
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
const handleSendSignInfo = async () => {};
const isEdit = ref(false);
const nameInputRef = ref();
const nameInputErrorMessageRef = ref();
const emailInputRef = ref();
const emailInputErrorMessageRef = ref();
const telInputRef = ref();
const telInputErrorMessageRef = ref();
const addressInputRef = ref();
const addressInputErrorMessageRef = ref();
const passwordInputRef = ref();
const passwordInputErrorMessageRef = ref();
const confirmPasswordInputRef = ref();
const confirmPasswordInputErrorMessageRef = ref();
</script>
<template>
  <div class="flex justify-between">
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Tab</h3>
    <button
      type="button"
      class="text-secondary bg-primary hover:opacity-80 font-medium rounded-lg px-5 py-2.5 text-center"
      @click="isEdit = !isEdit"
    >
      {{ isEdit ? "關閉編輯" : "打開編輯" }}
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="userName">姓名</label>
      <input
        ref="nameInputRef"
        class="inputStyle"
        placeholder="請輸入姓名"
        v-model.trim="userInfo.username"
        :disabled="!isEdit"
        @input="(event) => handleInputStopTextValidate(event, handleNameValidate)"
      />
      <p
        ref="nameInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>

    <!-- 電子郵件欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="email">電子郵件</label>
      <input
        ref="emailInputRef"
        class="inputStyle"
        placeholder="請輸入電子郵件"
        disabled="true"
        v-model.trim="userInfo.email"
        @input="(event) => handleInputStopTextValidate(event, handleEmailValidate)"
      />
      <p
        ref="emailInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>

    <!-- 電話號碼欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="tel">電話號碼</label>
      <input
        ref="telInputRef"
        class="inputStyle"
        placeholder="請輸入電話號碼"
        :disabled="!isEdit"
        v-model.trim="userInfo.tel"
        @input="(event) => handleInputStopTextValidate(event, handleTelValidate)"
      />
      <p
        ref="telInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>

    <!-- 地址欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="address">地址</label>
      <input
        ref="addressInputRef"
        class="inputStyle"
        placeholder="請輸入地址"
        :disabled="!isEdit"
        v-model.trim="userInfo.address"
        @input="(event) => handleInputStopTextValidate(event, handleAddressValidate)"
      />
      <p
        ref="addressInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>
    <!-- 生日欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="address">生日</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          class="inputStyle importantPS10"
          placeholder="請選擇生日"
          :disabled="!isEdit"
          v-model="formateDate"
          @focus="showDatePicker"
        />
        <div ref="datePickerRef" class="absolute z-10 hidden">
          <VDatePicker
            v-model="userInfo.birthday"
            :is-dark="isDarkMode"
            @dayclick="hideDatePicker"
          />
        </div>
      </div>
    </div>

    <!-- 性別欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="address">性別</label>
      <select
        class="block inputStyle"
        id="is_enabled"
        :disabled="!isEdit"
        v-model="userInfo.gender"
      >
        <option value="" disabled>請選擇性別</option>
        <option v-for="gender in genderConfig" :key="gender.showText" :value="gender.value">
          {{ gender.showText }}
        </option>
      </select>
    </div>
    <!-- 密碼欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="password">密碼</label>
      <input
        ref="passwordInputRef"
        type="password"
        class="inputStyle"
        placeholder="請輸入密碼"
        :disabled="!isEdit"
        v-model.trim="userInfo.password"
        @input="(event) => handleInputStopTextValidate(event, handlePasswordValidate)"
      />
      <InputToggle @emitToggleShowPassWord="toggleShowPassWord(passwordInputRef)" />

      <p
        ref="passwordInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>
    <!-- 確認密碼欄位 -->
    <div class="relative mb-4">
      <label class="block text-gray-700 dark:text-white" for="confirmPassword">確認密碼</label>
      <input
        ref="confirmPasswordInputRef"
        type="password"
        :disabled="!isEdit"
        class="inputStyle"
        placeholder="請再次輸入密碼"
        v-model.trim="userInfo.confirmPassword"
        @input="(event) => handleInputStopTextValidate(event, handleConfirmPasswordValidate)"
      />
      <InputToggle @emitToggleShowPassWord="toggleShowPassWord(confirmPasswordInputRef)" />
      <p
        ref="confirmPasswordInputErrorMessageRef"
        class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
      ></p>
    </div>
  </div>
  <div class="flex justify-end">
    <button
      @click="handleSendSignInfo"
      class="bg-primary text-white px-5 py-2.5 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      :disabled="isLoading"
    >
      送出資料
    </button>
  </div>
</template>
<style></style>
