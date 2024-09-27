export function useBaseFetch(url: string, options = {}) {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseApiUrl;
  const basePath = config.public.baseApiPath;

  return $fetch(`${baseUrl}/api/${basePath}/${url}`, {
    ...options,
    timeout: 10000,
    credentials: "include",
    onResponseError: (error) => {
      console.error("$fetch error", error.response._data.message);
    }
  });
}
