<script lang="ts" setup>
import { getOrderData } from "@/apis/order";
import type { OrderProduct } from "@/types/orderType";
interface product {
  title: string;
  qty: number;
  unit: string;
  total: number;
  id: string;
}
const handleGetOrderData = async (id: string) => {
  const res = await getOrderData(id);
  order.value = res.order;
  handleOrderProducts(res.order.products);
  user.value = res.order.user;
  total.value = res.order.total;
  is_paid.value = res.order.is_paid;
  cerateDate.value = res.order.create_at;
};
const handleOrderProducts = (orderProducts: OrderProduct) => {
  const convertedProducts = Object.keys(orderProducts).map((key) => {
    return {
      title: orderProducts[key].product.title,
      qty: orderProducts[key].qty,
      unit: orderProducts[key].product.unit,
      total: orderProducts[key].total,
      id: orderProducts[key].product.id
    };
  });
  products.value = convertedProducts;
};
const isLoading = ref(false);
const route = useRoute();
const order = ref();
const products = ref<product[]>([]);
const coupon = ref({ due_date: new Date(), percent: 0, title: "", code: "" });
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
  <div class="container mx-auto px-6 py-6 bg-gray-300 dark:bg-gray-800 dark:text-white">
    <div class="flex justify-center">
      <div class="w-full lg:w-2/3">
        <PaymentProcess
          :currentStatus="'confirmAndPay'"
          :isPaymentCompleted="is_paid"
        ></PaymentProcess>
        <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
          已購商品清單
        </h2>
        <div class="overflow-x-auto rounded-lg">
          <table class="min-w-full table-auto">
            <thead class="bg-gray-200 dark:bg-gray-500">
              <tr>
                <th class="px-4 py-2">品名</th>
                <th class="px-4 py-2">數量</th>
                <th class="px-4 py-2">單位</th>
                <th class="px-4 py-2">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in products"
                :key="item.id"
                class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
                :class="
                  index % 2 === 0 ? 'bg-gray-300 dark:bg-gray-400' : 'bg-gray-200 dark:bg-gray-600'
                "
              >
                <td class="px-4 py-2 text-center">{{ item.title }}</td>
                <td class="px-4 py-2 text-center">{{ item.qty }}</td>
                <td class="px-4 py-2 text-center">{{ item.unit }}</td>
                <td class="px-4 py-2 text-center">{{ item.total }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end w-full mt-4">
            <span>小計: {{ total }}元</span>
          </div>
        </div>
        <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
          訂購者資訊
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto">
            <tbody class="divide-y divide-gray-400 dark:divide-gray-600">
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
        <!-- api 怪怪的之後使用自己後端在加入這個功能 -->
        <!-- <h2 class="mb-3 border-b-2 mt-8 font-bold text-2xl">使用的優惠券</h2>
        <table class="min-w-full table-auto">
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr>
              <th class="text-left px-4 py-2">優惠券名稱</th>
              <td class="px-4 py-2 text-center">{{ coupon?.title }}</td>
            </tr>
            <tr>
              <th class="text-left px-4 py-2">優惠碼</th>
              <td class="px-4 py-2 text-center">{{ coupon?.code }}</td>
            </tr>
            <tr>
              <th class="text-left px-4 py-2">使用期限</th>
              <td class="px-4 py-2 text-center"></td>
            </tr>
            <tr>
              <th class="text-left px-4 py-2">折扣幅度</th>
              <td class="px-4 py-2 text-center">{{ coupon?.percent }}</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
    <template v-if="!is_paid">
      <div class="flex justify-center mt-6">
        <div class="w-full lg:w-2/3">
          <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
            選擇付款方式
          </h2>
          <div class="flex mb-3">
            <select v-model="payment" class="block inputStyle">
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
              class="ml-4 bg-primary text-white px-4 py-2 rounded hover:opacity-80 disabled:opacity-50 text-nowrap"
              type="button"
              @click="pay()"
              :disabled="isLoading || payment === 0"
            >
              確認付款
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style></style>
