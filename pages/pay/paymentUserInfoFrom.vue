<script lang="ts" setup>
import {
  nameValidatePattern,
  emailValidatePattern,
  telValidatePattern,
  addressValidatePattern,
  noBlankValidatePattern
} from "@/utils/validatePattern";
import { postOrderData } from "@/apis/order";

const userInfo = ref({
  name: "",
  tel: "",
  email: "",
  address: "",
  message: ""
});
const { addToast } = useToastStore();
const { nameValidate, emailValidate, telValidate, addressValidate } = useFormValidate();
const handleNameValidate = async () => {
  const result = await nameValidate(
    userInfo.value.name,
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

const handleSendUserInfo = async () => {
  try {
    const isValid = await Promise.all([
      handleNameValidate(),
      handleEmailValidate(),
      handleTelValidate(),
      handleAddressValidate()
    ]).then((results) => results.every(Boolean));

    if (isValid) {
      const res = await postOrderData(userInfo.value);
      const { message, orderId } = res;
      if (res.success) {
        addToast({ type: "success", message });
        toPayPage(orderId);
      } else {
        addToast({ type: "danger", message: "訂單建立失敗" });
      }
    }
  } catch (error) {
    console.error("資料驗證失敗", error);
  }
};

const router = useRouter();
const toPayPage = (id: string) => {
  router.push(`/pay/${id}`);
};
const nameInputRef = ref();
const nameInputErrorMessageRef = ref();
const emailInputRef = ref();
const emailInputErrorMessageRef = ref();
const telInputRef = ref();
const telInputErrorMessageRef = ref();
const addressInputRef = ref();
const addressInputErrorMessageRef = ref();
</script>
<template>
  <div class="container mx-auto px-6 py-6 bg-gray-300 dark:bg-gray-800 dark:text-white">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 lg:col-span-1">
        <div class="relative mb-6">
          <label class="block text-gray-700 dark:text-white" for="userName">姓名</label>
          <input
            ref="nameInputRef"
            :pattern="nameValidatePattern.source"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
            placeholder="請輸入姓名"
            v-model.trim="userInfo.name"
            @blur="handleNameValidate"
          />
          <p
            ref="nameInputErrorMessageRef"
            class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
          ></p>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="relative mb-6">
          <label class="block text-gray-700 dark:text-white" for="userEmail">電子郵件</label>
          <input
            ref="emailInputRef"
            :pattern="emailValidatePattern.source"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
            placeholder="請輸入電子郵件"
            v-model.trim="userInfo.email"
            @blur="handleEmailValidate"
          />
          <p
            ref="emailInputErrorMessageRef"
            class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
          ></p>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="relative mb-6">
          <label class="block text-gray-700 dark:text-white" for="userTel">電話</label>
          <input
            ref="telInputRef"
            :pattern="telValidatePattern.source"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
            placeholder="請輸入電話"
            v-model.trim="userInfo.tel"
            @blur="handleTelValidate"
          />
          <p
            ref="telInputErrorMessageRef"
            class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
          ></p>
        </div>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <div class="relative mb-6">
          <label class="block text-gray-700 dark:text-white" for="userAddress">地址</label>
          <input
            ref="addressInputRef"
            :pattern="addressValidatePattern.source"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
            placeholder="請輸入地址"
            v-model.trim="userInfo.address"
            @blur="handleAddressValidate"
          />
          <p
            ref="addressInputErrorMessageRef"
            class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
          ></p>
        </div>
      </div>
    </div>
    <div class="fromGroup">
      <label class="form-label" for="message">留言</label>
      <textarea
        class="rounded-lg w-full focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
        style="height: 100px"
        v-model="userInfo.message"
      ></textarea>
    </div>
    <div class="flex justify-end mt-6">
      <button class="bg-primary text-white py-2 px-4 rounded-lg" @click="handleSendUserInfo">
        送出資料
      </button>
    </div>
  </div>
</template>
<style></style>
