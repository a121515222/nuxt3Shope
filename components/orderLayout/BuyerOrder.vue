<script lang="ts" setup>
import type { BuyerOrder } from "@/types/adminOrderTypes";
import { getBuyerOrdersData } from "@/apis/adminOrder";
const router = useRouter();
const paginationData = ref();
const handleGetBuyerOrders = async () => {
  const res = await getBuyerOrdersData();
  orderList.value = res.data.orderList;
  paginationData.value = res.data.pagination;
};
const orderList = ref<BuyerOrder[]>([]);
const handleChangePage = async (page: number) => {
  await getBuyerOrdersData(page);
};

const goToPay = (id: string) => {
  router.push(`/pay/${id}`);
};
onMounted(async () => {
  await handleGetBuyerOrders();
});
</script>
<template>
  <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">買家訂單</h2>
  <div
    class="overflow-x-auto border rounded-lg bg-gray-200 dark:bg-gray-500 dark:text-gray-200 mb-4"
  >
    <table class="min-w-full table-auto">
      <thead>
        <tr class="text-nowrap">
          <th class="px-4 py-2">訂單編號</th>
          <th class="px-4 py-2">訂購時間</th>
          <th class="px-4 py-2">賣家姓名</th>
          <th class="px-4 py-2">賣家電話</th>
          <th class="px-4 py-2">賣家信箱</th>
          <th class="px-4 py-2">是否付款</th>
          <th class="px-4 py-2">詳細資料與付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in orderList"
          :key="item._id"
          class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
          :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
        >
          <td class="px-4 py-2 text-center">{{ item._id }}</td>
          <td class="px-4 py-2 text-center" v-timeFormat="item.createdAt"></td>
          <td class="px-4 py-2 text-center">{{ item.sellerInfo.username }}</td>
          <td class="px-4 py-2 text-center">{{ item.sellerInfo.tel }}</td>
          <td class="px-4 py-2 text-center">{{ item.sellerInfo.email }}</td>
          <td
            :class="{
              'text-green-800  dark:text-green-500': item.isPaid,
              'text-red-700 dark:text-red-500': !item.isPaid
            }"
            class="px-4 py-2 text-center"
          >
            {{ item.isPaid ? "已付款" : "未付款" }}
          </td>
          <td class="px-4 py-2 flex justify-center">
            <button
              class="bg-primary text-white px-4 py-2 rounded hover:opacity-80 hover:text-secondary"
              type="button"
              @click="goToPay(item._id)"
            >
              開啟
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pagination="paginationData" @changePage="handleChangePage" />
</template>
<style></style>
