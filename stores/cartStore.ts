import { defineStore } from "pinia";
import { getCart, postCart } from "@/apis/cart";
import type { Cart } from "@/types/cartTypes";
import { useThrottleFn } from "@vueuse/core";

export const useCartStore = defineStore("cartStore", () => {
  const indexStore = useIndexStore();
  const { isLoading } = storeToRefs(indexStore);
  const cartDataList = ref<Cart[]>([]);
  const toastStore = useToastStore();
  const messageBoxStore = useMessageBoxStore();
  const { showConfirm } = messageBoxStore;
  const { addToast } = toastStore;
  const router = useRouter();
  const handleGetCart = async () => {
    const res = await getCart();
    if (res.status) {
      cartDataList.value = res.data;
      return res;
    }
  };
  const handleAddCart = async (
    productId: string,
    sellerId: string,
    num: number = 1,
    title: string = ""
  ) => {
    const addCartFn = useThrottleFn(async () => {
      return await addCart(productId, sellerId, num, title);
    }, 500);
    await addCartFn();
  };
  const addCart = async (
    productId: string,
    sellerId: string,
    num: number = 1,
    title: string = ""
  ) => {
    isLoading.value = true;
    try {
      const res = await postCart(productId, sellerId, num);
      if (res.status) {
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
        message: `加入購物車錯誤`
      });
      const errorMessage = (error as Error).toString();
      isLoading.value = false;
      if (errorMessage.includes("Unauthorized")) {
        const result = await showConfirm("請先登入", "是否前往登入頁面？");
        if (result) {
          router.push({ name: "login" });
        }
      }
    } finally {
      isLoading.value = false;
    }
  };
  return { cartDataList, handleGetCart, handleAddCart };
});
