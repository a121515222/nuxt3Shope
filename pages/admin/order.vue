<script lang="ts" setup>
import { getAdminOrders, deleteAdminOrder } from "@/apis/adminOrder";
const { addToast } = useToastStore();
import type { AdminOrder } from "@/types/adminOrderTypes";
import type { Pagination } from "@/types/paginationTypes";
const isLoading = ref(false);
const postId = ref("");
const orders = ref<AdminOrder[]>([]);
const paginationData = ref<Pagination>({
  total_pages: 0,
  current_page: 1,
  has_pre: false,
  has_next: false,
  category: ""
});

const handleGetOrders = async (page = 1) => {
  isLoading.value = true;
  const res = await getAdminOrders(page);
  orders.value = res.orders;
  paginationData.value = res.pagination;
  isLoading.value = false;
};
const handleDeleteOrder = async (id: string) => {
  const res = await deleteAdminOrder(id);
  if (res.success) {
    await handleGetOrders();
    addToast({ type: "success", message: "成功刪除" });
  } else {
    addToast({ type: "danger", message: "刪除失敗" });
    console.log("deleteOrder");
  }
};
const handleChangePage = async (page: number) => {
  await handleGetOrders(page);
};
onMounted(async () => {
  await handleGetOrders();
});
</script>
<template>
  <div class="container mx-auto px-4 bg-gray-300 dark:bg-gray-800">
    <div class="py-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">訂單管理</h2>
      <div class="py-3">
        <div id="orderManager" data-accordion="collapse">
          <div
            v-for="(item, index) in orders"
            :key="item.id + index"
            class="border border-gray-200 rounded-lg mb-2 bg-gray-200 dark:bg-gray-800 dark:border-gray-800"
          >
            <!-- Accordion Header -->
            <h2 :id="`accordion-heading-${item.id}`">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-gray-500 bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 gap-3"
                :class="[
                  index === 0 ? 'rounded-t-lg ' : '',
                  postId === item.id ? 'bg-gray-400 dark:bg-gray-900' : ''
                ]"
                @click="postId = item.id"
                :data-accordion-target="`#accordion-body-${item.id}`"
                :aria-expanded="index === 0"
                :aria-controls="`accordion-body-${item.id}`"
              >
                <span>訂單編號{{ item.id }}</span>
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
            </h2>

            <!-- Accordion Content -->
            <div
              :id="`accordion-body-${item.id}`"
              :class="{ hidden: index !== 0 }"
              :aria-labelledby="`accordion-heading-${item.id}`"
            >
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
                          客戶資料
                        </h5>

                        <table class="w-full pt-2">
                          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 w-24 text-gray-700 dark:text-gray-300">姓名</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.name }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">住址</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.address }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">電話</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.tel }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">E-mail</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.email }}
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
                            @click="handleDeleteOrder(item.id)"
                          >
                            刪除訂單
                          </button>
                        </div>
                        <table class="w-full">
                          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 w-24 text-gray-700 dark:text-gray-300">訂單編號</th>
                              <td class="py-2 text-gray-900 dark:text-white">{{ item.id }}</td>
                              <td class="py-2 text-gray-700 dark:text-gray-300">修改付款狀態</td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">下單時間</th>
                              <td
                                class="py-2 text-gray-900 dark:text-white"
                                v-timeFormat="item.create_at"
                              ></td>
                              <td class="py-2"></td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">付款時間</th>
                              <td
                                class="py-2 text-gray-900 dark:text-white"
                                v-timeFormat="item.paid_date"
                              ></td>
                              <td class="py-2"></td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">付款狀態</th>
                              <td
                                :class="{
                                  'text-green-500 dark:text-green-400': item.is_paid,
                                  'text-red-500 dark:text-red-400': !item.is_paid
                                }"
                              >
                                {{ item.is_paid ? "已付款" : "未付款" }}
                              </td>
                              <td class="py-2">
                                <label class="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    value=""
                                    class="sr-only peer"
                                    v-model="item.is_paid"
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
                              <td class="py-2 text-gray-900 dark:text-white">{{ item.total }}</td>
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
                                v-for="(key, index) in Object.keys(item.products)"
                                :key="key"
                                :class="
                                  index % 2 === 0
                                    ? 'bg-gray-100 dark:bg-gray-700'
                                    : 'bg-gray-200 dark:bg-gray-800'
                                "
                              >
                                <td class="px-4 py-2">
                                  <img
                                    :src="
                                      item.products[key]?.product?.imageUrl ||
                                      '/defaultImg/image-1@2x.jpg'
                                    "
                                    class="max-w-12 max-h-8 object-cover"
                                  />
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.product?.title }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.final_total }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.qty }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{
                                    item.products[key]?.product?.origin_price >
                                    item.products[key]?.product?.price
                                      ? item.products[key]?.product?.origin_price
                                      : item.products[key]?.product?.price
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
  </div>
</template>
<style></style>
