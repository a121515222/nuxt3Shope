<script lang="ts" setup>
import { getCart, putCart, deleteAllCart, deleteCart } from "@/apis/cart";
const indexStore = useIndexStore();
const { isMainBannerIntersection } = storeToRefs(indexStore);
const cartRef = ref<HTMLElement | null>(null);
const cartWidth = ref(0);
const getCartWidth = () => {
  if (cartRef.value) {
    return cartRef.value.offsetWidth;
  }
  return 0;
};
const isShowCart = ref(false);
const toggleCart = () => {
  isShowCart.value = !isShowCart.value;
};
const cartClose = () => {
  isShowCart.value = false;
};
const isShowCartButton = ref(false);
const route = useRoute();
const shouldShowCartButton = () => {
  if (route.name === "index") {
    isShowCartButton.value = !isMainBannerIntersection.value;
  } else if (/product(List)?/.test(route.path)) {
    isShowCartButton.value = true;
  } else {
    isShowCartButton.value = false;
  }
};

const isChangeNum = ref(false);
const isCartLoading = ref(false);
const toPayProcess = () => {
  console.log("toPayProcess");
};
watch(
  [isMainBannerIntersection, () => route.path], // 監聽多個來源
  () => {
    shouldShowCartButton(); // 在任一來源變化時調用相同的函數
  }
);
const cartStore = useCartStore();
const { cartDataList, finalTotal } = storeToRefs(cartStore);
const cartId = ref("");
const changeNum = ref(1);
const handleEditCart = async (itemId: string, index: number) => {
  cartId.value = itemId;
  changeNum.value = cartDataList.value[index].qty;

  isChangeNum.value = true;
};
const handlePutCart = async (itemId: string, productId: string, index: number) => {
  isChangeNum.value = false;
  cartId.value = "";
  isCartLoading.value = true;
  cartDataList.value[index].qty = changeNum.value;
  const res = await putCart(itemId, productId, changeNum.value);
  console.log("putCart", res);
  if (res?.success) {
    isCartLoading.value = false;
    isChangeNum.value = false;
  }
};
const handleDeleteCart = async (id: string) => {
  console.log("deleteCart", id);
  isCartLoading.value = true;
  const res = await deleteCart(id);
  console.log("deleteCart", res);
  if (res?.success) {
    isCartLoading.value = false;
    await handleGetCart();
  }
};
const handleDeleteAllCarts = async () => {
  isCartLoading.value = true;
  const res = await deleteAllCart();
  console.log("deleteAllCarts", res);
  if (res?.success) {
    isCartLoading.value = false;
  }
};
const handleGetCart = async () => {
  const res = await getCart();
  cartDataList.value = res.data?.carts || [];
  finalTotal.value = res.data?.final_total || 0;
};
onMounted(async () => {
  cartWidth.value = getCartWidth();
  shouldShowCartButton();
  await handleGetCart();
});
// :style="{ transform: isShowCart ? 'translateX(0)' : `translateX(${cartWidth}px)` }"
</script>
<template>
  <div
    class="text-center fixed bottom-0 right-0 transform -translate-x-4 -translate-y-4 md:-translate-x-1/2 md:-translate-y-12"
    v-show="isShowCartButton"
  >
    <button
      class="relative group text-white bg-primary focus:ring-4 focus:ring-primary rounded-lg text-sm px-5 py-2.5"
      type="button"
      @click="toggleCart"
    >
      <svg
        class="w-12 h-12 text-secondary group-hover:text-red-500"
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
          d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
        />
      </svg>
    </button>
    <span
      v-show="cartDataList.length !== 0"
      class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300"
      >{{ cartDataList.length }}</span
    >
  </div>

  <div
    class="fixed top-0 right-0 z-40 w-full md:w-1/2 h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out bg-white dark:bg-gray-800"
    tabindex="-1"
    ref="cartRef"
    :class="{ [`right-[${cartWidth}px]`]: isShowCart, 'translate-x-full': !isShowCart }"
  >
    <h5 class="text-base font-semibold text-gray-500 uppercase dark:text-white">購物車清單</h5>
    <button
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      @click="toggleCart"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
      <div class="flex flex-col px-3 w-full">
        <div class="self-end">
          <button
            class="btn border border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
            type="button"
            @click="handleDeleteAllCarts()"
            :disabled="cartDataList.length === 0"
            :class="{ 'cursor-not-allowed': cartDataList.length === 0 }"
          >
            刪除所有
          </button>
        </div>

        <table class="table-auto w-full text-left dark:text-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th class="hidden sm:table-cell" scope="col"></th>
              <th scope="col">商品名稱</th>
              <th class="hidden sm:table-cell" scope="col">總價格</th>
              <th scope="col text-center">數量</th>
              <th scope="col text-center">單價</th>
              <th scope="col"></th>
              <th class="hidden sm:table-cell" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartDataList.length > 0">
              <tr
                v-for="(item, index) in cartDataList"
                :key="item.product.title + index"
                class="border-b"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td class="hidden sm:table-cell">
                  <img
                    class="w-[50px] h-[30px] object-cover"
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                  />
                </td>
                <td>{{ item.product.title }}</td>
                <td class="hidden sm:table-cell text-center">{{ Math.floor(item.final_total) }}</td>
                <td class="text-center" v-if="!isChangeNum || item.id !== cartId">
                  {{ item.qty }}
                </td>
                <td v-if="isChangeNum && item.id === cartId" class="min-w-[48px]">
                  <input
                    class="form-control specialWidth text-black"
                    type="number"
                    min="1"
                    max="100"
                    v-model="changeNum"
                  />
                </td>
                <td class="text-center">
                  {{
                    item.product.origin_price > item.product.price === false
                      ? item.product.origin_price
                      : item.product.price
                  }}
                </td>
                <td class="flex flex-col gap-1">
                  <button
                    v-show="!isChangeNum || item.id !== cartId"
                    type="button"
                    class="btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                    @click="handleEditCart(item.id, index)"
                  >
                    {{ "編輯" }}
                  </button>
                  <button
                    v-show="isChangeNum && item.id === cartId"
                    type="button"
                    class="btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                    @click="handlePutCart(item.id, item.product_id, index)"
                  >
                    {{ "完成" }}
                  </button>
                  <button
                    class="btn border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                    type="button"
                    @click="handleDeleteCart(item.id)"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                  >
                    刪除
                  </button>
                </td>
                <!-- <td class="hidden sm:table-cell">
                  <button
                    type="button"
                    class="btn border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50"
                    @click="handleDeleteCart(item.id, item.product.title)"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                  >
                    刪除
                  </button>
                </td> -->
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="8" class="text-center">目前購物車沒有東西</td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="self-end flex gap-5 px-3">
          <p class="text-center font-bold">小計</p>
          <p class="text-center">{{ Math.floor(0) }}元</p>
        </div>

        <div class="self-end pb-1">
          <button
            type="button"
            class="btn bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            @click="
              toPayProcess();
              cartClose();
            "
            :disabled="cartDataList.length === 0 || isCartLoading"
            :class="{ 'cursor-not-allowed': cartDataList.length === 0 || isCartLoading }"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
