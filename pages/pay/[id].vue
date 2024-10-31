<script lang="ts" setup>
import { getOrderData } from "@/apis/order";
const handleGetOrderData = async (id: string) => {
  const res = await getOrderData(id);
  order.value = res.order;
  products.value = res.order.products;
  user.value = res.order.user;
  total.value = res.order.total;
  is_paid.value = res.order.is_paid;
  cerateDate.value = res.order.create_at;
};
const isLoading = ref(false);
const route = useRoute();
const order = ref();
const products = ref();
const user = ref();
const total = ref();
const is_paid = ref();
const cerateDate = ref();
const payment = ref(0);
const currentStatus = ref("");
const paymentOptionsConfig = [
  { value: 1, text: "信用卡" },
  { value: 2, text: "ATM" },
  { value: 3, text: "超商繳款" }
];
const pay = () => {
  console.log("pay");
};
onMounted(async () => {
  await handleGetOrderData(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);
});
</script>
<template>
  <div class="container mx-auto pt-9">
    <div class="flex justify-center">
      <div class="w-full lg:w-2/3">
        <!-- <GuestPayProcessInspector :current-status="confirmAndPay" :payment="is_paid" /> -->
        <div class="container mx-auto my-2">
          <div class="flex justify-center items-center">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full border-4 border-blue-500 text-center">1</div>
              <p class="m-0 p-0 ml-2">寫訂購資料</p>
            </div>
            <i class="bi bi-caret-right mx-2"></i>
            <div
              class="flex items-center opacity-30"
              :class="{
                'opacity-100': ['confirmAndPay', 'payProcessFinished'].includes(currentStatus)
              }"
            >
              <div class="w-8 h-8 rounded-full border-4 border-blue-500 text-center">2</div>
              <p class="m-0 p-0 ml-2">確認資料與付款</p>
            </div>
            <i class="bi bi-caret-right mx-2"></i>
            <div
              class="flex items-center opacity-30"
              :class="{ 'opacity-100': 'payProcessFinished' === currentStatus || payment }"
            >
              <div class="w-8 h-8 rounded-full border-4 border-blue-500 text-center">3</div>
              <p class="m-0 p-0 ml-2">付款完成</p>
            </div>
          </div>
        </div>
        <h2 class="mb-3 border-b-2">已購商品清單</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead class="bg-gray-200">
              <tr>
                <th class="px-4 py-2">品名</th>
                <th class="px-4 py-2">數量</th>
                <th class="px-4 py-2">單位</th>
                <th class="px-4 py-2">價格</th>
              </tr>
            </thead>
            <tbody
              v-for="item in products"
              :key="item.id"
              class="bg-white border-b hover:bg-gray-100"
            >
              <tr>
                <td class="px-4 py-2">{{ item.product.title }}</td>
                <td class="px-4 py-2">{{ item.qty }}</td>
                <td class="px-4 py-2">{{ item.product.unit }}</td>
                <td class="px-4 py-2">{{ item.total }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end w-full mt-4">
            <span>小計: {{ total }}元</span>
          </div>
        </div>
        <h2 class="mb-3 border-b-2">訂購者資訊</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <tbody>
              <tr>
                <th class="text-left px-4 py-2">姓名</th>
                <td class="px-4 py-2">{{ user?.name }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">電話</th>
                <td class="px-4 py-2">{{ user?.tel }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">住址</th>
                <td class="px-4 py-2">{{ user?.address }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">付款狀態</th>
                <td
                  :class="{
                    'text-green-600': is_paid,
                    'text-red-600': !is_paid
                  }"
                  class="px-4 py-2"
                >
                  {{ is_paid ? "已付款" : "未付款" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template v-if="!is_paid">
      <div class="flex justify-center mt-6">
        <div class="w-full lg:w-2/3">
          <h2 class="mb-3 border-b-2">選擇付款方式</h2>
          <div class="flex mb-3">
            <select
              v-model="payment"
              class="form-select w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="0" selected disabled>請選擇付款方式</option>
              <option
                v-for="option in paymentOptionsConfig"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <button
              class="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              type="button"
              @click="pay()"
              :disabled="isLoading || payment === 0"
            >
              <span
                v-show="isLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              確認付款
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style></style>
