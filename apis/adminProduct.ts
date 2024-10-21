import {
  type FetchAdminProduct,
  type AdminProduct,
  type AdminProductResponse
} from "@/types/adminProductTypes";
import { useBaseFetch } from "@/utils/fetch";
export function getAdminProducts(page: number) {
  const api_token = getCookie("token");
  return useBaseFetch<FetchAdminProduct>(`admin/products?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
export function postAdminProduct(info: AdminProduct) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminProductResponse>("admin/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}
export function putAdminProduct(info: AdminProduct) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminProductResponse>(`admin/product/${info.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}
export function deleteAdminProduct(id: string) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminProductResponse>(`admin/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
