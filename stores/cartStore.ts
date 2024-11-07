import { defineStore } from "pinia";
import { getCart, postCart } from "@/apis/cart";
import { type Cart } from "@/types/cartTypes";
import { useThrottleFn } from "@vueuse/core";
export const useCartStore = defineStore("cartStore", () => {
  const indexStore = useIndexStore();
  const { isLoading } = storeToRefs(indexStore);
  const cartDataList = ref<Cart[]>([]);
  const finalTotal = ref<number | string>(0);
  const toastStore = useToastStore();
  const { addToast } = toastStore;
  const handleGetCart = async () => {
    const res = await getCart();
    if (res.success) {
      cartDataList.value = res.data.carts;
      finalTotal.value = res.data.final_total;
      return res;
    }
  };
  const handleAddCart = async (productId: string, qty: number = 1, title: string = "") => {
    const addCartFn = useThrottleFn(async () => {
      return await addCart(productId, qty, title);
    }, 500);
    await addCartFn();
  };
  const addCart = async (productId: string, qty: number = 1, title: string = "") => {
    isLoading.value = true;
    try {
      const res = await postCart(productId, qty);
      if (res.success) {
        const cartData = await handleGetCart();
        addToast({
          duration: 3000,
          type: "success",
          message: `${title}已加入購物車`
        });
        return cartData;
      } else {
        addToast({
          duration: 3000,
          type: "danger",
          message: `${title}加入購物車失敗`
        });
      }
    } catch (error) {
      addToast({
        duration: 3000,
        type: "danger",
        message: `加入購物車錯誤: ${error}`
      });
    } finally {
      isLoading.value = false;
    }
  };
  return { cartDataList, finalTotal, handleGetCart, handleAddCart };
});
