import { useBaseFetch } from "@/utils/fetch";

interface GenerateProductContentByGeminiAIRequest {
  title: string;
  description: string;
  category: string[];
  tag: string[];
  content: string;
}
interface GenerateArticleContentByGeminiAIRequest {
  title: string;
  description: string;
  content: string;
  tag: string[];
}
interface GenerateContentByGeminiAIResponse {
  status: boolean;
  message: string;
  data: string;
}

export function generateProductContentByGeminiAI(data: GenerateProductContentByGeminiAIRequest) {
  const api_token = getCookie("authorization");
  return useBaseFetch<GenerateContentByGeminiAIResponse>(
    "generateProductByGeminiAI",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...data })
    },
    "newClient"
  );
}

export function generateArticleContentByGeminiAI(data: GenerateArticleContentByGeminiAIRequest) {
  const api_token = getCookie("authorization");
  return useBaseFetch<GenerateContentByGeminiAIResponse>(
    "generateArticleByGeminiAI",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${api_token}`
      },
      body: JSON.stringify({ ...data })
    },
    "newClient"
  );
}
