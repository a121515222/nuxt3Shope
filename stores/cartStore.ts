import { defineStore } from "pinia";
import { getCart, postCart } from "@/apis/cart";
import { type Cart } from "@/types/cartTypes";
export const useCartStore = defineStore("cartStore", () => {
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
    const res = await postCart(productId, qty);
    if (res.success) {
      const res = await handleGetCart();
      addToast({
        duration: 3000,
        type: "success",
        message: `${title}已加入購物車`
      });
      return res;
    } else {
      addToast({
        duration: 3000,
        type: "danger",
        message: `${title}加入購物車失敗`
      });
    }
  };
  return { cartDataList, finalTotal, handleGetCart, handleAddCart };
});
