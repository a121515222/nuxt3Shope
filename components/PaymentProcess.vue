<script lang="ts" setup>
interface PaymentProcessProps {
  currentStatus: "confirmAndPay" | "payProcessFinished" | "userInfo";
  isPaymentCompleted: boolean;
}
const props = withDefaults(defineProps<PaymentProcessProps>(), {
  currentStatus: "confirmAndPay",
  isPaymentCompleted: false
});
</script>
<template>
  <div class="container mx-auto my-2">
    <div class="flex justify-center items-center">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full border-4 border-primary text-center">1</div>
        <p class="m-0 p-0 ml-2">寫訂購資料</p>
      </div>
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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

      <div
        class="flex items-center"
        :class="
          ['confirmAndPay', 'payProcessFinished'].includes(props.currentStatus)
            ? 'opacity-100'
            : 'opacity-30'
        "
      >
        <div class="w-8 h-8 rounded-full border-4 border-primary text-center">2</div>
        <p class="m-0 p-0 ml-2">確認資料與付款</p>
      </div>
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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

      <div
        class="flex items-center opacity-30"
        :class="{
          'opacity-100': 'payProcessFinished' === props.currentStatus || props.isPaymentCompleted
        }"
      >
        <div class="w-8 h-8 rounded-full border-4 border-primary text-center">3</div>
        <p class="m-0 p-0 ml-2">付款完成</p>
      </div>
    </div>
  </div>
</template>
<style></style>
