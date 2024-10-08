import { useBaseFetch } from "@/utils/fetch";
import { type FetchCartData } from "@/types/cartTypes";
export function getCart() {
  return useBaseFetch<FetchCartData>("cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function postCart(productId: string, qty: number) {
  return useBaseFetch<FetchCartData>("cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: { qty, product_id: productId } })
  });
}
export function putCart(itemId: string, productId: string, qty: number) {
  return useBaseFetch<FetchCartData>(`cart/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: { qty, product_id: productId } })
  });
}
export function deleteCart(id: string) {
  return useBaseFetch<FetchCartData>(`cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
export function deleteAllCart() {
  return useBaseFetch<FetchCartData>("carts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
