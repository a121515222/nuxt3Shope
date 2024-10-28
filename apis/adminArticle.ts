import { useBaseFetch } from "@/utils/fetch";
import {
  type AdminArticle,
  type AdminSignalArticleShowInModal,
  type AdminArticleResponse,
  type FetchAdminArticle
} from "@/types/adminArticleTypes";
export function getAdminArticles(page: number = 1) {
  const api_token = getCookie("token");
  return useBaseFetch<FetchAdminArticle>(`admin/articles?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
export function getAdminArticle(id: string) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminSignalArticleShowInModal>(`admin/article/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
export function postAdminArticle(info: AdminArticle) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminArticleResponse>("admin/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}
export function putAdminArticle(info: AdminArticle) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminArticleResponse>(`admin/article/${info.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    },
    body: JSON.stringify({ data: { ...info } })
  });
}

export function deleteAdminArticle(id: string) {
  const api_token = getCookie("token");
  return useBaseFetch<AdminArticleResponse>(`admin/article/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${api_token}`
    }
  });
}
