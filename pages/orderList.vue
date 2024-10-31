<script lang="ts" setup>
import { getOrdersData } from "@/apis/order";
import type { Order } from "@/types/orderType";
const router = useRouter();
const orders = ref<Order[]>();
const handleGetOrderData = async (page: number = 1) => {
  const res = await getOrdersData(page);
  orders.value = res.orders;
};
const handleChangePage = async (page: number) => {
  await handleGetOrderData(page);
};
const paginationData = ref();
const goToPay = (id: string) => {
  router.push(`/pay/${id}`);
};
onMounted(async () => {
  await handleGetOrderData();
});
// https://vue3-course-api.hexschool.io/v2/api/chun-chia//orders?page=1
</script>
<template>
  <div class="container mx-auto px-6 py-6 bg-gray-300 dark:bg-gray-800 dark:text-white">
    <h2 class="text-2xl font-semibold pb-8">訂單與付款頁</h2>
    <div class="overflow-x-auto border rounded-lg bg-gray-200 dark:bg-gray-500">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="text-nowrap">
            <th class="px-4 py-2">訂單編號</th>
            <th class="px-4 py-2">訂購時間</th>
            <th class="px-4 py-2">姓名</th>
            <th class="px-4 py-2">電話</th>
            <th class="px-4 py-2">是否付款</th>
            <th class="px-4 py-2">詳細資料與付款</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in orders"
            :key="item.id"
            class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
            :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
          >
            <td class="px-4 py-2 text-center">{{ item.id }}</td>
            <td class="px-4 py-2 text-center" v-timeFormat="item.create_at"></td>
            <td class="px-4 py-2 text-center">{{ item.user.name }}</td>
            <td class="px-4 py-2 text-center">{{ item.user.tel }}</td>
            <td
              :class="{
                'text-green-600': item.is_paid,
                'text-red-600': !item.is_paid
              }"
              class="px-4 py-2 text-center"
            >
              {{ item.is_paid ? "已付款" : "未付款" }}
            </td>
            <td class="px-4 py-2 flex justify-center">
              <button
                class="bg-primary text-white px-4 py-2 rounded hover:opacity-80 hover:text-secondary"
                type="button"
                @click="goToPay(item.id)"
              >
                開啟
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pagination="paginationData" @changePage="handleChangePage" />
  </div>
</template>
<style></style>
