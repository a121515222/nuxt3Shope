import type { ChatMessageResponseType } from "@/types/chatMessageTypes";
import { useBaseFetch } from "@/utils/fetch";

export function getChatMessage(
  chatId: string,
  messageTimestamp: string = ""
) {
  const api_token = getCookie("authorization");
  return useBaseFetch<ChatMessageResponseType>(
    `chatMessages?chatId=${chatId}&messageTimestamp=${messageTimestamp}`,
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