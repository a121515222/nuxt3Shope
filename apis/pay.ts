import { useBaseFetch } from "@/utils/fetch";
import type { PayResponse } from "@/types/payTypes";
export function postPay(id: string) {
  return useBaseFetch<PayResponse>(`pay/${id}`, {
    method: "POST"
  });
}
