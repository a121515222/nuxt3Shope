import type { CommentResponseType } from "@/types/commentTypes";
import { useBaseFetch } from "@/utils/fetch";

interface PostCommentDataType {
  score: number;
  comment: string;
  sellerId: string;
  orderId: string;
}

export function postComment(info: PostCommentDataType) {
  const api_token = getCookie("authorization");
  return useBaseFetch<CommentResponseType>(
    "comment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...info })
    },
    "newClient"
  );
}

export function getComment(sellerId: string, page: number = 1, limit: number = 10) {
  return useBaseFetch<any>(
    `buyerGetSellerComment?sellerId=${sellerId}&page${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    },
    "newClient"
  );
}
