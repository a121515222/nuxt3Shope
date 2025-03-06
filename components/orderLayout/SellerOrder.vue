<script lang="ts" setup>
import type { SellerOrder } from "@/types/adminOrderTypes";
import { getSellerOrdersData, putSellerOderStatus } from "@/apis/adminOrder";
import { handleImageError } from "@/utils/imageHandler";
import { orderStatusConfig } from "@/utils/config";
const indexStore = useIndexStore();
const { addToast } = useToastStore();
const { isLoading } = storeToRefs(indexStore);
const paginationData = ref();
const handleGetBuyerOrders = async (page: number = 1) => {
  const res = await getSellerOrdersData(page);
  orderList.value = res.data.orderList;
  paginationData.value = res.data.pagination;
};

const orderList = ref<SellerOrder[]>([]);
const currentOpenOrderId = ref("");
const handleCollapse = (id: string) => {
  if (currentOpenOrderId.value === id) {
    currentOpenOrderId.value = "";
  } else {
    currentOpenOrderId.value = id;
  }
};
const handleChangePage = async (page: number) => {
  await handleGetBuyerOrders(page);
};
const handleSellerOrderStatus = async (orderId: string, orderListIndex: number) => {
  try {
    isLoading.value = true;
    const res = await putSellerOderStatus(orderId, orderList.value[orderListIndex].status);
    const { message } = res;
    if (res.status) {
      addToast({ type: "success", message });
      await handleGetBuyerOrders();
    } else {
      addToast({ type: "danger", message: "更新訂單失敗" });
    }
  } catch (error) {
    addToast({ type: "danger", message: "更新訂單失敗" });
  } finally {
    isLoading.value = false;
  }
};
const getOrderStatusText = (status: keyof typeof orderStatusConfig) => {
  return orderStatusConfig[status]?.showText || "狀態異常";
};
onMounted(async () => {
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
            class="flex items-center justify-between w-full p-5 font-medium text-gray-500 bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 gap-3"
            :class="[
              index === 0 ? 'rounded-t-lg ' : '',
              currentOpenOrderId === item._id
                ? 'bg-gray-400 dark:bg-gray-300 text-white dark:text-gray-700'
                : ''
            ]"
            @click="handleCollapse(item._id)"
          >
            <span>訂單編號{{ item._id }} </span>
            <div class="flex items-center gap-2">
              <span
                :class="{
                  'text-green-800  dark:text-green-500':
                    item.status === 'completed' ||
                    item.status === 'shipped' ||
                    item.status === 'confirmed' ||
                    item.status === 'inProcessed' ||
                    item.status === 'buyerGotProduct',
                  'text-red-700 dark:text-red-500':
                    item.status === 'buyerCancelled' || item.status === 'sellerCancelled'
                }"
                >{{ getOrderStatusText(item.status) }}</span
              >
              <span
                :class="
                  item.isPaid
                    ? 'text-green-800 dark:text-green-500'
                    : 'text-red-700 dark:text-red-500'
                "
              >
                {{ item.isPaid ? "已付款" : "未付款" }}
              </span>
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
            </div>
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
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">訂單備註</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.buyerInfo.buyerMessage }}
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
                        <!-- <button
                          class="px-4 py-2 text-sm border border-red-300 dark:border-red-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="isLoading"
                          @click=""
                        >
                          刪除訂單
                        </button>   #todo 還沒接api  -->
                      </div>
                      <table class="w-full">
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 w-24 text-gray-700 dark:text-gray-300">訂單編號</th>
                            <td class="py-2 text-gray-900 dark:text-white">{{ item._id }}</td>
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
                            <th class="py-2 text-gray-700 dark:text-gray-300">付款方式</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              {{ item.paidMethod }}
                            </td>
                            <td class="py-2"></td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">收貨時間</th>
                            <td
                              class="py-2 text-gray-900 dark:text-white"
                              v-timeFormat="item.receiptDate"
                            ></td>
                            <td class="py-2"></td>
                          </tr>
                          <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                            <th class="py-2 text-gray-700 dark:text-gray-300">訂單狀態</th>
                            <td class="py-2 text-gray-900 dark:text-white">
                              <select
                                :disabled="isLoading"
                                v-model="item.status"
                                class="block inputStyle"
                                @change="handleSellerOrderStatus(item._id, index)"
                              >
                                <option
                                  v-for="option in orderStatusConfig"
                                  :key="option.value"
                                  :value="option.value"
                                  :disabled="
                                    option.value === 'buyerCancelled' ||
                                    option.value === 'buyerGotProduct'
                                  "
                                >
                                  {{ option.showText }}
                                </option>
                              </select>
                            </td>
                            <td class="py-2"></td>
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
                              class="border-b border-gray-700 dark:border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-white"
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
    <Pagination :pagination="paginationData" @changePage="handleChangePage" />
  </div>
</template>
<style></style>
