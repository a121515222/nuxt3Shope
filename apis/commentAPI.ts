import { useBaseFetch } from "@/utils/fetch";

interface PostCommentDataType {
  score: number;
  comment: string;
  sellerId: string;
  orderId: string;
}

export function postComment(info: PostCommentDataType) {
  const api_token = getCookie("authorization");
  return useBaseFetch<any>(
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
