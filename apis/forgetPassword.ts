import { useBaseFetch } from "@/utils/fetch";
import type { ForgetPasswordType, ForgetPasswordResponse } from "@/types/forgetPasswordTypes";
export function forgetPasswordPost(data: ForgetPasswordType) {
  return useBaseFetch<ForgetPasswordResponse>(
    "forgetPassword",
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
