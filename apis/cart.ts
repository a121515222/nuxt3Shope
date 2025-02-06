import { useBaseFetch } from "@/utils/fetch";
import { type FetchCartData } from "@/types/cartTypes";
export function getCart() {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchCartData>(
    "cart",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "newClient"
  );
}
export function postCart(productId: string, sellerId: string, num: number) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchCartData>(
    "cart",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ num, productId, sellerId })
    },
    "newClient"
  );
}
export function putCart(
  cartId: string,
  productId: string,
  num: number,
  isDeleteProduct: boolean = false
) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchCartData>(
    `cart`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({
        cartId,
        num,
        productId,
        isDeleteProduct
      })
    },
    "newClient"
  );
}
export function deleteCart(id: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchCartData>(
    `cart/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "newClient"
  );
}
