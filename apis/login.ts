import { useBaseFetch } from "@/utils/fetch";
import {
  type UserLogin,
  type UserLoginResponse,
  type CheckTokenResponse,
  type LogOutResponse
} from "@/types/loginTypes";

export function postLoginNew(data: UserLogin) {
  return useBaseFetch<UserLoginResponse>(
    "logIn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data })
    },
    "newClient"
  );
}
export function postLogOutNew(userId: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<LogOutResponse>(
    "logOut",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ userId })
    },
    "newClient"
  );
}
export function postCheckLoginNew(id: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<CheckTokenResponse>(
    "logInCheck",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ userId: id })
    },
    "newClient"
  );
}
