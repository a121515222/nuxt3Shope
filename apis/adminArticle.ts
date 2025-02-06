import { useBaseFetch } from "@/utils/fetch";
import type {
  AdminArticle,
  AdminSignalArticleShowInModal,
  AdminArticleResponse,
  FetchAdminArticle
} from "@/types/adminArticleTypes";
import type { FetchArticleData } from "@/types/articleTypes";
export function getUserArticles(page: number | string, limit: number | string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<FetchAdminArticle>(
    `articles?page=${page}&limit=${limit}`,
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

export function getUserArticleById(id: string) {
  return useBaseFetch<FetchArticleData>(
    `articleById/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    "newClient"
  );
}

export function postUserArticle(info: AdminArticle) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminArticleResponse>(
    "article",
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

export function putUserArticle(info: AdminArticle) {
  const api_token = getCookie("authorization");
  return useBaseFetch<AdminArticleResponse>(
    `articleById/${info._id}`,
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
export function deleteUserArticle(id: string) {
  const api_token = getCookie("authorization");
  const userId = localStorage.getItem("userId");
  return useBaseFetch<AdminArticleResponse>(
    `articleById/${id}`,
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
