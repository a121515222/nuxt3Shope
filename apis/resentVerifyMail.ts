import { useBaseFetch } from "@/utils/fetch";
interface ResendVerifyMailResponse {
  status: boolean;
  message: string;
  data: {
    info: string;
    sendVerifyTokenTime: string;
    sendVerifyTokenCount: number;
  };
}
export function resentVerifyMail(account: string) {
  return useBaseFetch<ResendVerifyMailResponse>(
    "sendVerifyToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ account })
    },
    "newClient"
  );
}
