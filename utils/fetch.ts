export function useBaseFetch<T>(url: string, options = {}) {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseApiUrl;
  const basePath = config.public.baseApiPath;
  return $fetch<T>(`${baseUrl}/api/${basePath}/${url}`, {
    ...options,
    timeout: 10000,
    credentials: "include",
    onResponseError: (error) => {
      console.error("$fetch error", error.response._data.message);
    }
  }).catch((error) => {
    console.log("useBaseFetch error", error);
    return Promise.reject(error); // 明確返回 Promise
  });
}
export async function fetchData<T, R>(
  key: string,
  fetcher: () => Promise<R>,
  dataList: Ref<T[]>,
  phaser?: string
) {
  const { data } = await useAsyncData(key, async () => {
    if (dataList.value.length === 0) {
      const res = await fetcher();
      return res;
    }
  });
  // 確保 `data.value` 是物件且 `phaser` 存在時，取得對應屬性
  if (data.value && typeof data.value === "object") {
    const extractedData = phaser ? (data.value as Record<string, any>)[phaser] : data.value;

    // 檢查 `extractedData` 是否是陣列，然後賦值給 `dataList`
    if (Array.isArray(extractedData)) {
      dataList.value = extractedData;
    }
  }
}
