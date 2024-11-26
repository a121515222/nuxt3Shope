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
export function postLogOutNew(id: string) {
  const api_token = getCookie("authorization");
  return useBaseFetch<LogOutResponse>(
    "logOut",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ id })
    },
    "newClient"
  );
}

export function postLogin(data: UserLogin) {
  // #todo
  // signin login 傻傻分不清楚 之後弄自己的後端之後要改成 signin
  return useBaseFetch<UserLoginResponse>(
    "admin/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...data })
    },
    "admin"
  );
}

export function postLogOut() {
  const api_token = getCookie("authorization");
  return useBaseFetch<LogOutResponse>(
    "check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      }
    },
    "check"
  );
}

export function postCheckLogin() {
  const api_token = getCookie("token");
  return useBaseFetch<CheckTokenResponse>(
    "check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // #todo 要注意是不是前面要加上 Bearer
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ api_token })
    },
    "check"
  );
}
