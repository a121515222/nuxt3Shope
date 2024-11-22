import { useBaseFetch } from "@/utils/fetch";
import type { SignInDataType, SignInResponseType } from "@/types/singInTypes";
export function postSignIn(data: SignInDataType) {
  return useBaseFetch<SignInResponseType>(
    "signIn",
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
