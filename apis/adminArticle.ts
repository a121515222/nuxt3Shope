import { useBaseFetch } from "@/utils/fetch";
import type {
  AdminArticle,
  AdminSignalArticleShowInModal,
  AdminArticleResponse,
  FetchAdminArticle,
  FetchAdminArticleById
} from "@/types/adminArticleTypes";

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
  return useBaseFetch<FetchAdminArticleById>(
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
// export function getAdminArticle(id: string) {
//   const api_token = getCookie("token");
//   return useBaseFetch<AdminSignalArticleShowInModal>(`admin/article/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${api_token}`
//     }
//   });
// }
// export function postAdminArticle(info: AdminArticle) {
//   const api_token = getCookie("token");
//   return useBaseFetch<AdminArticleResponse>("admin/article", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${api_token}`
//     },
//     body: JSON.stringify({ data: { ...info } })
//   });
// }
// export function putAdminArticle(info: AdminArticle) {
//   const api_token = getCookie("token");
//   return useBaseFetch<AdminArticleResponse>(`admin/article/${info.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${api_token}`
//     },
//     body: JSON.stringify({ data: { ...info } })
//   });
// }

// export function deleteAdminArticle(id: string) {
//   const api_token = getCookie("token");
//   return useBaseFetch<AdminArticleResponse>(`admin/article/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${api_token}`
//     }
//   });
// }
