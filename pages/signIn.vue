<script lang="ts" setup>
const indexStore = useIndexStore();
const { addToast } = useToastStore();
const { handleInputStopTextValidate } = useInputValidate();
const {
  nameValidate,
  emailValidate,
  telValidate,
  addressValidate,
  passwordValidate,
  confirmPasswordValidate
} = useFormValidate();
const datePickerRef = ref<HTMLElement | null>(null);
const { showDatePicker, hideDatePicker, formateShowDate } = useDatePicker(datePickerRef);
const { isDarkMode } = storeToRefs(indexStore);
const signInfo = ref({
  name: "",
  email: "",
  tel: "",
  address: "",
  password: "",
  confirmPassword: "",
  birthday: new Date(),
  gender: null
});
const formateDate = computed(() => {
  return formateShowDate(signInfo.value.birthday);
});
const handleNameValidate = async () => {
  const result = await nameValidate(
    signInfo.value.name,
    nameInputErrorMessageRef.value,
    nameInputRef.value
  );
  return result;
};
const handleEmailValidate = async () => {
  const result = await emailValidate(
    signInfo.value.email,
    emailInputErrorMessageRef.value,
    emailInputRef.value
  );
  return result;
};
const handleTelValidate = async () => {
  const result = await telValidate(
    signInfo.value.tel,
    telInputErrorMessageRef.value,
    telInputRef.value
  );
  return result;
};
const handleAddressValidate = async () => {
  const result = await addressValidate(
    signInfo.value.address,
    addressInputErrorMessageRef.value,
    addressInputRef.value
  );
  return result;
};
const handlePasswordValidate = async () => {
  const result = await passwordValidate(
    signInfo.value.password,
    passwordInputErrorMessageRef.value,
    passwordInputRef.value
  );
  if (signInfo.value.confirmPassword) {
    await handleConfirmPasswordValidate();
  }
  return result;
};
const handleConfirmPasswordValidate = async () => {
  const result = await confirmPasswordValidate(
    signInfo.value.confirmPassword,
    signInfo.value.password,
    confirmPasswordInputErrorMessageRef.value,
    confirmPasswordInputRef.value
  );
  return result;
};
const handleSendSignInfo = async () => {
  try {
    const isValid = await Promise.all([
      handleNameValidate(),
      handleEmailValidate(),
      handleTelValidate(),
      handleAddressValidate()
    ]).then((results) => results.every(Boolean));

    if (isValid) {
      // const res = await postOrderData(signInfo.value);
      // const { message, orderId } = res;
      // if (res.success) {
      //   addToast({ type: "success", message });
      // } else {
      //   addToast({ type: "danger", message: "訂單建立失敗" });
      // }
    }
  } catch (error) {
    console.error("資料驗證失敗", error);
  }
};
const genderConfig = {
  male: {
    value: "male",
    showText: "男性"
  },
  female: {
    value: "female",
    showText: "女性"
  },
  other: {
    value: null,
    showText: "不透露"
  }
};
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
const isShowPassword = ref(false);
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
  <div class="container mx-auto px-6 py-5 dark:text-white">
    <h2 class="text-2xl font-semibold">註冊</h2>
    <div
      class="border rounded-lg bg-gray-200 dark:bg-gray-500 px-8 py-6 grid grid-cols-1 md:grid-cols-2 md:gap-4 my-3"
    >
      <!-- 姓名欄位 -->
      <div class="relative mb-4">
        <label class="block text-gray-700 dark:text-white" for="userName">姓名</label>
        <input
          ref="nameInputRef"
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請輸入姓名"
          v-model.trim="signInfo.name"
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
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請輸入電子郵件"
          v-model.trim="signInfo.email"
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
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請輸入電話號碼"
          v-model.trim="signInfo.tel"
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
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請輸入地址"
          v-model.trim="signInfo.address"
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
            class="text-sm rounded-lg ps-10 block dark:placeholder-gray-400 dark:text-white w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
            placeholder="請選擇生日"
            v-model="formateDate"
            @focus="showDatePicker"
          />
          <div ref="datePickerRef" class="absolute z-10 hidden">
            <VDatePicker
              v-model="signInfo.birthday"
              :is-dark="isDarkMode"
              @dayclick="hideDatePicker"
            />
          </div>
        </div>
      </div>

      <!-- 性別欄位 -->
      <div class="relative mb-4">
        <label class="block text-gray-700 dark:text-white" for="address">性別</label>
        <select class="block inputStyle" id="is_enabled" v-model="signInfo.gender">
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
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請輸入密碼"
          v-model.trim="signInfo.password"
          @input="(event) => handleInputStopTextValidate(event, handlePasswordValidate)"
        />
        <PasswordToggle
          :right="'4'"
          :bottom="'2'"
          @emitToggleShowPassWord="toggleShowPassWord(passwordInputRef)"
        />

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
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
          placeholder="請再次輸入密碼"
          v-model.trim="signInfo.confirmPassword"
          @input="(event) => handleInputStopTextValidate(event, handleConfirmPasswordValidate)"
        />
        <PasswordToggle
          :right="'4'"
          :bottom="'2'"
          @emitToggleShowPassWord="toggleShowPassWord(confirmPasswordInputRef)"
        />
        <p
          ref="confirmPasswordInputErrorMessageRef"
          class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
        ></p>
      </div>
    </div>
    <button
      @click="handleSendSignInfo"
      class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      送出資料
    </button>
  </div>
</template>
<style></style>
