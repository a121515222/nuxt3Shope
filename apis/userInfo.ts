import type {
  UserInfoDataType,
  UserInfoDataResponse,
  userInfoUpdateDataType
} from "@/types/userInfoTypes";
import { useBaseFetch } from "@/utils/fetch";
import { getAuthorizationCookie } from "@/utils/cookie";
export function getUserInfo(id: string) {
  return useBaseFetch<UserInfoDataResponse>(
    `admin/user/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getAuthorizationCookie()}`
      }
    },
    "newClient"
  );
}
export function updateUserInfo(data: userInfoUpdateDataType) {
  return useBaseFetch<UserInfoDataResponse>(
    `admin/user`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getAuthorizationCookie()}`
      },
      body: JSON.stringify(data)
    },
    "newClient"
  );
}
