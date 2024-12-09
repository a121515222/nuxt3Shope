import {
  type FetchAdminProduct,
  type AdminProduct,
  type AdminProductResponse
} from "@/types/adminProductTypes";
import { useBaseFetch } from "@/utils/fetch";
import { getCookie } from "@/utils/auth";
export function getUserProducts(page: number | string, limit: number | string, userId: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchAdminProduct>(
    `products/${userId}?page=${page}&limit=${limit}`,
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
// export function putAdminProduct(info: AdminProduct) {
//   const api_token = getCookie("token");
//   return useBaseFetch<AdminProductResponse>(`admin/product/${info.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${api_token}`
//     },
//     body: JSON.stringify({ data: { ...info } })
//   });
// }
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
