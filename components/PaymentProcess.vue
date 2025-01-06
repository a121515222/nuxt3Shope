<script lang="ts" setup>
const orderStore = useOrderStore();
const { isFinishedPayment: isFinishPay } = storeToRefs(orderStore);
const route = useRoute();
const path = ref(route.path);

const isConfirmPayment = computed(() => {
  return route.path.startsWith("/pay/") && !route.path.includes("paymentUserInfoFrom");
});

// 判斷是否為步驟 3 (付款完成頁面)
const isFinishedPayment = computed(() => {
  return route.path === "/pay/finishedPayment" || isFinishPay.value;
});
</script>
<template>
  <div class="container mx-auto my-2">
    <div class="flex justify-center items-center text-sm md:text-base min-w-[320px]">
      <!-- 步驟 1：寫訂購資料 -->
      <div class="flex items-center shrink-0">
        <div
          class="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 border-primary flex items-center justify-center text-xs md:text-base"
        >
          1
        </div>
        <p class="m-0 p-0 ml-1 md:ml-2 whitespace-nowrap">寫訂購資料</p>
      </div>

      <svg
        class="w-4 h-4 md:w-6 md:h-6 text-gray-800 dark:text-white mx-1 md:mx-2 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m10 16 4-4-4-4"
        />
      </svg>

      <!-- 步驟 2：確認資料與付款 -->
      <div
        class="flex items-center shrink-0"
        :class="{
          'opacity-100': isConfirmPayment,
          'opacity-30': !isConfirmPayment
        }"
      >
        <div
          class="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 border-primary flex items-center justify-center text-xs md:text-base"
        >
          2
        </div>
        <p class="m-0 p-0 ml-1 md:ml-2 whitespace-nowrap">確認資料與付款</p>
      </div>

      <svg
        class="w-4 h-4 md:w-6 md:h-6 text-gray-800 dark:text-white mx-1 md:mx-2 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m10 16 4-4-4-4"
        />
      </svg>

      <!-- 步驟 3：付款完成 -->
      <div
        class="flex items-center shrink-0"
        :class="{
          'opacity-100': isFinishedPayment,
          'opacity-30': !isFinishedPayment
        }"
      >
        <div
          class="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 border-primary flex items-center justify-center text-xs md:text-base"
        >
          3
        </div>
        <p class="m-0 p-0 ml-1 md:ml-2 whitespace-nowrap">付款完成</p>
      </div>
    </div>
  </div>
</template>
<style></style>
