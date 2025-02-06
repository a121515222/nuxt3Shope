import {
  type FetchAdminProduct,
  type AdminProduct,
  type AdminProductResponse
} from "@/types/adminProductTypes";

import { useBaseFetch } from "@/utils/fetch";
import { getCookie } from "@/utils/auth";
export function getUserProducts(page: number | string, limit: number | string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchAdminProduct>(
    `products?page=${page}&limit=${limit}`,
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

export function postUserProduct(info: AdminProduct) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminProductResponse>(
    "product",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...info })
    },
    "newClient"
  );
}

export function putUserProduct(info: AdminProduct) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminProductResponse>(
    `productById/${info._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...info })
    },
    "newClient"
  );
}

export function deleteUserProduct(id: string) {
  const api_token = getCookie("authorization");
  const userId = localStorage.getItem("userId");
  return useBaseFetch<AdminProductResponse>(
    `productById/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ userId })
    },
    "newClient"
  );
}
