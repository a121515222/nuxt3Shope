import { useBaseFetch } from "@/utils/fetch";

export function generateContentByGemini(query: string) {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: query
          }
        ]
      }
    ]
  };

  return useBaseFetch<any>(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useRuntimeConfig().geminiKey}` // API key should be stored in the config
      },
      body: JSON.stringify(payload)
    }
  );
}
