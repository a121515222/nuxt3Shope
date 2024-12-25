<script lang="ts" setup>
import type { SellerOrderList } from "@/types/adminOrderTypes";
import { getSellerOrdersData } from "@/apis/adminOrder";
import { handleImageError } from "@/utils/imageHandler";

const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);

const handleGetBuyerOrders = async () => {
  const res = await getSellerOrdersData();
  orderList.value = res.data.orderList;
};
const paginationData = ref();
const orderList = ref<SellerOrderList[]>([]);
const currentOpenOrderId = ref("");
const handleCollapse = (id: string) => {
  if (currentOpenOrderId.value === id) {
    currentOpenOrderId.value = "";
  } else {
    currentOpenOrderId.value = id;
  }
};
onMounted(async () => {
  // useFlowbite(({ initCollapses }) => {
  //   initCollapses();
  // });
  await handleGetBuyerOrders();
});
</script>
<template>
  <div class="py-5">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">賣家訂單</h2>
    <div class="py-3">
      <div id="orderManager" data-accordion="collapse">
        <div
          v-for="(item, index) in orderList"
          :key="item._id + index"
          class="border border-gray-200 rounded-lg mb-2 bg-gray-200 dark:bg-gray-800 dark:border-gray-800"
        >
          <!-- Accordion Header -->
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium text-gray-500 bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 gap-3"
            :class="[
              index === 0 ? 'rounded-t-lg ' : '',
              currentOpenOrderId === item._id ? 'bg-gray-400 dark:bg-gray-900' : ''
            ]"
            @click="handleCollapse(item._id)"
          >
            <span>訂單編號{{ item._id }}</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 shrink-0 transition-transform text-gray-600 dark:text-gray-400"
              :class="{ 'rotate-180': index === 0 }"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>

          <!-- Accordion Content -->
          <div :class="{ hidden: currentOpenOrderId !== item._id }">
            <div
              class="p-5 border-t border-gray-200 dark:border-gray-600 bg-gray-200 dark:bg-gray-600"
            >
              <!-- Card Content -->
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <div class="bg-primary text-white p-4 rounded-t-lg">訂單內容</div>
                <div class="p-4">
                  <div class="grid grid-cols-12 gap-4">
                    <!-- Customer Info -->
                    <div class="col-span-12 lg:col-span-5">
                      <h5 class="text-lg font-semibold mb-5 text-gray-900 dark:text-white">
                        買家資料
                      </h5>

                      <table class="w-full pt-2">
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 w-24 text-gray-700 dark:text-gray-300">姓名</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.buyerInfo.username }}
                            </td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">住址</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.buyerInfo.address }}
                            </td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">電話</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.buyerInfo.tel }}
                            </td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">E-mail</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.buyerInfo.email }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Order Details -->
                    <div class="col-span-12 lg:col-span-6">
                      <div class="flex justify-between items-center mb-3 w-full">
                        <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                          訂單細節
                        </h5>
                        <button
                          class="px-4 py-2 text-sm border border-red-300 dark:border-red-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="isLoading"
                          @click=""
                        >
                          刪除訂單
                        </button>
                      </div>
                      <table class="w-full">
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 w-24 text-gray-700 dark:text-gray-300">訂單編號</th>
                            <td class="py-2 text-gray-900 dark:text-white">{{ item._id }}</td>
                            <td class="py-2 text-gray-700 dark:text-gray-300">修改付款狀態</td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">下單時間</th>
                            <td
                              class="py-2 text-gray-900 dark:text-white"
                              v-timeFormat="item.createdAt"
                            ></td>
                            <td class="py-2"></td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">付款時間</th>
                            <td
                              class="py-2 text-gray-900 dark:text-white"
                              v-timeFormat="item.paidDate"
                            ></td>
                            <td class="py-2"></td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">付款狀態</th>
                            <td
                              :class="{
                                'text-green-500 dark:text-green-400': item.isPaid,
                                'text-red-500 dark:text-red-400': !item.isPaid
                              }"
                            >
                              {{ item.isPaid ? "已付款" : "未付款" }}
                            </td>
                            <td class="py-2">
                              <label class="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  value=""
                                  class="sr-only peer"
                                  v-model="item.isPaid"
                                />
                                <div
                                  class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                                ></div>
                                <span
                                  class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                ></span>
                              </label>
                            </td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">總金額</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.totalPrice }}
                            </td>
                            <td class="py-2"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Product List -->
                    <div class="col-span-12">
                      <h5 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                        產品清單
                      </h5>
                      <div class="flex flex-col overflow-x-auto">
                        <table class="min-w-full table-auto">
                          <thead>
                            <tr
                              class="border-b border-gray-700 bg-gray-200 dark:bg-gray-800 dark:border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-white"
                            >
                              <th scope="col" class="px-4 py-2"></th>
                              <th scope="col" class="px-4 py-2 text-left">商品名稱</th>
                              <th scope="col" class="px-4 py-2 text-left">總價格</th>
                              <th scope="col" class="px-4 py-2 text-left">數量</th>
                              <th scope="col" class="px-4 py-2 text-left">單價</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(product, index) in item.productList"
                              :key="product._id"
                              :class="
                                index % 2 === 0
                                  ? 'bg-gray-100 dark:bg-gray-700'
                                  : 'bg-gray-200 dark:bg-gray-800'
                              "
                            >
                              <td class="px-4 py-2">
                                <img
                                  :src="product.imageUrl"
                                  loading="lazy"
                                  class="max-w-12 max-h-8 object-cover"
                                  @error="handleImageError"
                                />
                              </td>
                              <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                {{ product.title }}
                              </td>
                              <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                {{ product.num * product.productSellPrice }}
                              </td>
                              <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                {{ product.num }}
                              </td>
                              <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                {{
                                  product.price > product.productSellPrice
                                    ? product.price
                                    : product.productSellPrice
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Pagination :pagination="paginationData" @changePage="handleChangePage" /> -->
  </div>
</template>
<style></style>
