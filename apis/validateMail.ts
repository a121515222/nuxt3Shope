import { useBaseFetch } from "@/utils/fetch";
interface ValidateMailPostDataType {
  token: string;
  id: string;
}
interface ValidateMailResponse {
  status: boolean;
  message: string;
}
export function validateMailPost(data: ValidateMailPostDataType) {
  return useBaseFetch<ValidateMailResponse>(
    "verifyMailToken",
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
