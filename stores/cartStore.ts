import { defineStore } from "pinia";
import { getCart, postCart } from "@/apis/cart";
import { type Cart } from "@/types/cartTypes";
export const useCartStore = defineStore("cartStore", () => {
  const cartDataList = ref<Cart[]>([]);
  const finalTotal = ref<number>(0);
  const handleGetCart = async () => {
    const res = await getCart();
    if (res.success) {
      cartDataList.value = res.data.carts;
      finalTotal.value = res.data.final_total;
      return res;
    }
  };
  const handleAddCart = async (productId: string, qty: number = 1) => {
    const res = await postCart(productId, qty);
    if (res.success) {
      const res = await handleGetCart();
      return res;
    }
  };
  return { cartDataList, finalTotal, handleGetCart, handleAddCart };
});
