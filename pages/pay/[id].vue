<script lang="ts" setup>
import type { BuyerOrder } from "@/types/adminOrderTypes";
import { getBuyerOrder, putBuyerOrder } from "@/apis/adminOrder";
import { postPay } from "@/apis/pay";
import {
  nameValidatePattern,
  telValidatePattern,
  addressValidatePattern
} from "@/utils/validatePattern";
const { addToast } = useToastStore();
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const orderStore = useOrderStore();
const { isFinishedPayment } = storeToRefs(orderStore);
const handleBuyerGetOrderData = async (id: string) => {
  const res = await getBuyerOrder(id);
  order.value = res.data;
  isFinishedPayment.value = order.value.isPaid;
};
const isEditBuyerInfo = ref(false);
const route = useRoute();
const order = ref<BuyerOrder>({
  _id: "",
  totalPrice: 0,
  productList: [],
  sellerInfo: {
    username: "",
    tel: "",
    email: ""
  },
  buyerInfo: {
    username: "",
    tel: "",
    email: "",
    address: "",
    buyerMessage: ""
  },
  couponInfo: {
    code: "",
    discount: 0,
    expireDate: null,
    title: "",
    couponId: ""
  },
  sellerId: "",
  createdAt: new Date(),
  paidDate: "",
  status: "",
  isPaid: false,
  paidMethod: ""
});
const coupon = ref({ due_date: new Date(), percent: 0, title: "", code: "" });
const user = ref();
const total = ref();
const is_paid = ref();
const cerateDate = ref();
// #todo payment 用自己的後端需要傳到後端
const paymentMethod = ref(0);
const currentStatus = ref("");
const paymentOptionsConfig = [
  { value: 1, text: "信用卡" },
  { value: 2, text: "ATM" },
  { value: 3, text: "超商繳款" }
];
const router = useRouter();
const pay = async () => {
  console.log("pay");
  isLoading.value = true;
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  if (!id) {
    return;
  } else {
    const res = await postPay(id);
    if (res.success) {
      isLoading.value = false;
      router.push("/pay/finishedPayment");
    }
  }
};
const isAbleSendBuyerInfo = ref(true);
const { nameValidate, emailValidate, telValidate, addressValidate } = useFormValidate();
const handleNameValidate = async () => {
  const result = await nameValidate(
    order.value.buyerInfo.username,
    nameInputErrorMessageRef.value,
    nameInputRef.value
  );
  isAbleSendBuyerInfo.value = result;
  return result;
};
const handleTelValidate = async () => {
  const result = await telValidate(
    order.value.buyerInfo.tel,
    telInputErrorMessageRef.value,
    telInputRef.value
  );
  isAbleSendBuyerInfo.value = result;
  return result;
};
const handleAddressValidate = async () => {
  const result = await addressValidate(
    order.value.buyerInfo.address,
    addressInputErrorMessageRef.value,
    addressInputRef.value
  );
  isAbleSendBuyerInfo.value = result;
  return result;
};

const handleFinishEditBuyerInfo = async () => {
  try {
    const isValid = await Promise.all([
      handleNameValidate(),
      handleTelValidate(),
      handleAddressValidate()
    ]).then((results) => results.every(Boolean));
    if (isValid) {
      isLoading.value = true;
      const buyerInfo = {
        orderId: order.value._id,
        username: order.value.buyerInfo.username,
        tel: order.value.buyerInfo.tel,
        address: order.value.buyerInfo.address,
        buyerMessage: order.value.buyerInfo.buyerMessage
      };

      const res = await putBuyerOrder(buyerInfo);
      if (res.status) {
        addToast({ type: "success", message: "修改成功" });
        await handleBuyerGetOrderData(
          Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
        );
      } else {
        addToast({ type: "danger", message: "修改失敗" });
      }
    }
  } catch (error) {
    console.error("資料驗證失敗", error);
  } finally {
    isLoading.value = false;
    isEditBuyerInfo.value = false;
    isAbleSendBuyerInfo.value = true;
  }
};
const nameInputRef = ref();
const nameInputErrorMessageRef = ref();
const telInputRef = ref();
const telInputErrorMessageRef = ref();
const addressInputRef = ref();
const addressInputErrorMessageRef = ref();
onMounted(async () => {
  await handleBuyerGetOrderData(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  );
});
</script>
<template>
  <div class="container mx-auto px-6 py-6 bg-gray-300 dark:bg-gray-800 dark:text-white">
    <div class="flex justify-center">
      <div class="w-full lg:w-2/3">
        <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
          已購商品清單
        </h2>
        <div class="overflow-x-auto rounded-lg">
          <table class="min-w-full table-auto table-fixed">
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
                v-for="(item, index) in order.productList"
                :key="item.productId"
                class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-600 text-nowrap"
                :class="
                  index % 2 === 0 ? 'bg-gray-300 dark:bg-gray-400' : 'bg-gray-200 dark:bg-gray-600'
                "
              >
                <td class="px-4 py-2 text-center">{{ item.title }}</td>
                <td class="px-4 py-2 text-center">{{ item.num }}</td>
                <td class="px-4 py-2 text-center">{{ item.unit }}</td>
                <td class="px-4 py-2 text-center">{{ item.productSellPrice * item.num }}</td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-end w-full mt-4">
            <span class="font-bold text-2xl">小計: {{ order.totalPrice }}元</span>
          </div>
        </div>
        <div class="mt-8 w-full relative">
          <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
            買家資訊
          </h2>
          <div class="absolute top-[-16px] right-0">
            <button
              v-if="!isEditBuyerInfo"
              type="button"
              class="bg-primary hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="isEditBuyerInfo = !isEditBuyerInfo"
            >
              修改資料
            </button>
            <button
              v-if="isEditBuyerInfo"
              :disabled="!isAbleSendBuyerInfo"
              type="button"
              class="bg-secondary hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              @click="handleFinishEditBuyerInfo"
            >
              完成修改
            </button>
          </div>
        </div>

        <div class="overflow-x-auto no-scrollbar">
          <table class="min-w-full table-auto table-th table-fixed">
            <tbody class="divide-y divide-gray-400 dark:divide-gray-600">
              <tr>
                <th class="text-left px-4 py-2">姓名</th>
                <td v-if="!isEditBuyerInfo" class="px-4 py-2">{{ order.buyerInfo.username }}</td>
                <td v-else class="px-4 py-6 relative">
                  <input
                    ref="nameInputRef"
                    :pattern="nameValidatePattern.source"
                    type="text"
                    class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                    placeholder="請輸入姓名"
                    v-model="order.buyerInfo.username"
                    @blur="handleNameValidate"
                  />
                  <p
                    ref="nameInputErrorMessageRef"
                    class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-4 bottom-[-22px]"
                  ></p>
                </td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">電話</th>
                <td v-if="!isEditBuyerInfo" class="px-4 py-2">{{ order.buyerInfo.tel }}</td>
                <td v-else class="px-4 py-6 relative">
                  <input
                    ref="telInputRef"
                    :pattern="telValidatePattern.source"
                    type="tel"
                    class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                    placeholder="請輸入電話"
                    v-model="order.buyerInfo.tel"
                    @blur="handleTelValidate"
                  />
                  <p
                    ref="telInputErrorMessageRef"
                    class="w-full h-1/2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-4 bottom-[-22px]"
                  ></p>
                </td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">地址</th>
                <td v-if="!isEditBuyerInfo" class="px-4 py-2">{{ order.buyerInfo.address }}</td>
                <td v-else class="px-4 py-6 relative">
                  <input
                    ref="addressInputRef"
                    :pattern="addressValidatePattern.source"
                    type="text"
                    class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 dark:invalid:bg-red-800 focus:invalid:ring-red-500"
                    placeholder="請輸入地址"
                    v-model="order.buyerInfo.address"
                    @blur="handleAddressValidate"
                  />
                  <p
                    ref="addressInputErrorMessageRef"
                    class="w-full h-1/2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-4 bottom-[-22px]"
                  ></p>
                </td>
              </tr>

              <tr>
                <th class="text-left px-4 py-2">訂單備註</th>
                <td v-if="!isEditBuyerInfo" class="px-4 py-2">
                  {{ order.buyerInfo.buyerMessage }}
                </td>
                <td v-else class="px-4 py-6">
                  <textarea
                    class="w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
                    placeholder="請輸入訂單備註"
                    v-model="order.buyerInfo.buyerMessage"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">付款狀態</th>
                <td
                  :class="{
                    'text-green-600': order.isPaid,
                    'text-red-600': !order.isPaid
                  }"
                  class="px-4 py-2"
                >
                  {{ order.isPaid ? "已付款" : "未付款" }}
                </td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">付款日期</th>
                <td class="px-4 py-2" v-timeFormat="order.paidDate"></td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">付款方式</th>
                <td class="px-4 py-2">{{ order.paidMethod }}</td>
              </tr>
              <tr v-if="order.couponInfo.couponId === '' || order.couponInfo.couponId === null">
                <th class="text-left px-4 py-2">是否使用優惠券</th>
                <td class="px-4 py-2">否</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 class="mb-3 mt-8 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
          賣家資訊
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto table-th">
            <tbody class="divide-y divide-gray-400 dark:divide-gray-600">
              <tr>
                <th class="text-left px-4 py-2">姓名</th>
                <td class="px-4 py-2">{{ order.sellerInfo.username }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">電話</th>
                <td class="px-4 py-2">{{ order.sellerInfo.tel }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2
          v-if="order.couponInfo.couponId"
          class="mb-3 border-b-2 mt-8 font-bold text-xl border-gray-600 dark:border-gray-400"
        >
          使用的優惠券
        </h2>
        <div class="overflow-x-auto">
          <table v-if="order.couponInfo.couponId" class="min-w-full table-auto table-th">
            <tbody
              v-if="order.couponInfo.couponId"
              class="divide-y divide-gray-400 dark:divide-gray-600"
            >
              <tr>
                <th class="text-left px-4 py-2">優惠券名稱</th>
                <td class="px-4 py-2">{{ order.couponInfo.title }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">優惠碼</th>
                <td class="px-4 py-2">{{ order.couponInfo.code }}</td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">使用期限</th>
                <td class="px-4 py-2" v-timeFormat="order.couponInfo.expireDate"></td>
              </tr>
              <tr>
                <th class="text-left px-4 py-2">折扣幅度</th>
                <td class="px-4 py-2">{{ order.couponInfo.discount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template v-if="!is_paid">
      <div class="flex justify-center mt-6">
        <div class="w-full lg:w-2/3">
          <h2 class="mb-3 border-b-2 border-gray-600 dark:border-gray-400 font-bold text-xl">
            選擇付款方式
          </h2>
          <div class="flex mb-3">
            <select v-model="paymentMethod" class="block inputStyle">
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
              :disabled="isLoading || paymentMethod === 0 || order.isPaid"
            >
              確認付款
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style>
.table-th th {
  width: 45%; /* 為每個 <th> 分配固定的百分比寬度 */
}
</style>
