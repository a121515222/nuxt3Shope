<script lang="ts" setup>
import { getCart, putCart, deleteAllCart, deleteCart } from "@/apis/cart";
import { couponValidatePattern } from "@/utils/validatePattern";
import { postCoupon } from "~/apis/coupon";
const indexStore = useIndexStore();
const { isMainBannerIntersection } = storeToRefs(indexStore);
const { validateInput } = useInputValidate();
const messageBoxStore = useMessageBoxStore();
const { showConfirm } = messageBoxStore;
const { addToast } = useToastStore();
const cartRef = ref<HTMLElement | null>(null);
const cartWidth = ref(0);
const trRef = ref<HTMLElement[]>([]);

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
  } else if (/product(List)?/.test(route.path) || /pay/.test(route.path)) {
    isShowCartButton.value = true;
  } else {
    isShowCartButton.value = false;
  }
};

const isChangeNum = ref(false);
const isCartLoading = ref(false);
const router = useRouter();
const toPayProcess = () => {
  router.push("/pay/paymentUserInfoFrom");
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
const handleGetCart = async () => {
  const res = await getCart();
  cartDataList.value = res.data?.carts || [];
  finalTotal.value = res.data?.final_total || "金額異常";
};
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
  if (res?.success) {
    isCartLoading.value = false;
    isChangeNum.value = false;
    addToast({ type: "success", message: "編輯成功" });
  } else {
    addToast({ type: "danger", message: "編輯失敗" });
  }
};
const handleDeleteCart = async (id: string) => {
  isCartLoading.value = true;
  const res = await deleteCart(id);
  if (res?.success) {
    isCartLoading.value = false;
    addToast({ type: "success", message: "刪除成功" });
    await handleGetCart();
  }
  // 考慮移除因為在fetch.ts中已經有處理錯誤訊息，除非後端不回傳404 status code
  else {
    addToast({ type: "danger", message: "刪除失敗" });
  }
};
const handleDeleteAllCarts = async () => {
  const result = await showConfirm("確定要刪除所有商品嗎?", "刪除所有商品");
  if (!result) {
    return;
  } else {
    isCartLoading.value = true;
    const res = await deleteAllCart();
    if (res?.success) {
      isCartLoading.value = false;
      await handleGetCart();
    }
  }
};

const handleMouseEnter = (index: number) => {
  trRef.value[index].classList.remove("hover:bg-gray-300", "dark:hover:bg-gray-600");
};
const handleMouseLeave = (index: number) => {
  trRef.value[index].classList.add("hover:bg-gray-300", "dark:hover:bg-gray-600");
};

const couponInputRef = ref<HTMLInputElement | null>(null);
const couponInputErrorMessageRef = ref<HTMLParagraphElement | null>(null);
const coupon = ref("");
const couponRule = (data: string | number): boolean => {
  data = data.toString();
  return couponValidatePattern.test(data);
};

const couponValidateConfig = {
  rule: {
    fn: () => couponRule(coupon.value),
    errorMessage: "優惠券只有英文與數字"
  }
};

const handleCouponInputValidation = async () => {
  try {
    const result = await validateInput(
      couponValidateConfig,
      couponInputErrorMessageRef.value as HTMLParagraphElement
    );
    return result;
  } catch (error) {}
};
const handleCoupon = async () => {
  const result = await handleCouponInputValidation();
  if (result) {
    if (coupon.value === "") {
      return;
    } else {
      const res = await postCoupon({ code: coupon.value });

      const { final_total } = res.data;
      const { message } = res;
      finalTotal.value = final_total || "金額異常";
      if (res?.success) {
        addToast({ type: "success", message });
      } else {
        addToast({ type: "danger", message: "優惠券驗證失敗" });
      }
    }
  }
};
onMounted(async () => {
  cartWidth.value = getCartWidth();
  shouldShowCartButton();
  await handleGetCart();
});
</script>
<template>
  <div
    class="text-center fixed bottom-[52px] lg:bottom-[16px] right-0 transform -translate-x-4 -translate-y-4 md:-translate-x-1/2 md:-translate-y-12"
    v-show="isShowCartButton"
  >
    <button
      class="relative group text-white bg-third focus:ring-4 focus:ring-third rounded-lg text-sm px-3 py-2 :g:px-5 lg:py-2.5"
      type="button"
      @click="toggleCart"
    >
      <svg
        class="w-8 h-8 lg:w-12 lg:h-12 text-secondary group-hover:text-red-500"
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
    class="fixed top-0 right-0 z-40 w-full md:w-1/2 h-screen p-4 overflow-y-auto transition-all duration-300 ease-in-out bg-gray-200 dark:bg-gray-700 no-scrollbar"
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
            class="border border-red-500 rounded-lg text-red-500 bg-red-500 px-4 py-2 hover:opacity-80 text-white disabled:opacity-50"
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
            </tr>
          </thead>
          <tbody>
            <template v-if="cartDataList.length > 0">
              <tr
                v-for="(item, index) in cartDataList"
                :key="item.product.title + index"
                class="border-b hover:bg-gray-300 dark:hover:bg-gray-600"
                :ref="
                  (el) => {
                    if (el) trRef[index] = el as HTMLElement;
                  }
                "
              >
                <th scope="row">{{ index + 1 }}</th>
                <td class="hidden sm:table-cell">
                  <img
                    class="w-[50px] h-[30px] object-cover"
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    loading="lazy"
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
                    type="button"
                    class="mt-2 border border-primary bg-primary rounded-lg px-2 py-2 text-nowrap text-secondary hover:opacity-80 disabled:opacity-50"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                    @click="
                      isChangeNum && item.id === cartId
                        ? handlePutCart(item.id, item.product_id, index)
                        : handleEditCart(item.id, index)
                    "
                    @mouseenter="handleMouseEnter(index)"
                    @mouseleave="handleMouseLeave(index)"
                  >
                    {{ isChangeNum && item.id === cartId ? "完成" : "編輯" }}
                  </button>
                  <button
                    class="mb-2 border border-red-500 rounded-lg text-red-500 px-2 py-2 text-nowrap hover:opacity-80 disabled:opacity-50"
                    type="button"
                    @click="handleDeleteCart(item.id)"
                    :disabled="isCartLoading"
                    :class="{ 'cursor-not-allowed': isCartLoading }"
                    @mouseenter="handleMouseEnter(index)"
                    @mouseleave="handleMouseLeave(index)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="8" class="text-center">目前購物車沒有東西</td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="self-end dark:text-white flex gap-5 px-3">
          <p class="text-center font-bold">小計</p>
          <p class="text-center">{{ finalTotal }}元</p>
        </div>

        <div class="self-end pb-1">
          <button
            type="button"
            class="py-2 px-3 bg-third text-white border border-third px-4 rounded-lg hover:opacity-80 disabled:opacity-50"
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
    <div class="flex justify-between px-3">
      <div class="relative grow pr-3">
        <input
          ref="couponInputRef"
          :pattern="couponValidatePattern.source"
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white invalid:border-red-500 invalid:bg-red-50 focus:invalid:ring-red-500 dark:invalid:bg-red-800"
          placeholder="請輸入優惠券"
          v-model="coupon"
          @blur="handleCouponInputValidation"
        />
        <p
          ref="couponInputErrorMessageRef"
          class="w-full h-1/2 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-20px]"
        ></p>
      </div>
      <button
        class="btn bg-primary text-white border border-primary px-4 py-2 rounded-md hover:opacity-80"
        type="button"
        :disabled="coupon === ''"
        @click="handleCoupon"
      >
        送出
      </button>
    </div>
  </div>
</template>
<style></style>
