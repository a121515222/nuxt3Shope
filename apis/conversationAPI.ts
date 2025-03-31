import { useBaseFetch } from "@/utils/fetch";
import type {ConversationResponseType} from "@/types/conversationTypes";
export function getConversationList(page: number = 1, limit: number = 10) {
  const api_token = getCookie("authorization");
  return useBaseFetch<ConversationResponseType>(
    `conversations?page=${page}&limit=${limit}`,
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