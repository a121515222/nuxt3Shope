export function useBaseFetch<T>(
  url: string,
  options = {},
  urlType: "client" | "admin" | "check" | "newClient" = "client"
) {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseApiUrl;
  const basePath = config.public.baseApiPath;
  const baseApiUrl = config.public.baseApiNew;
  const { addToast } = useToastStore();
  const clientUrl = `${baseUrl}/api/${basePath}/${url}`;
  const adminUrl = `${baseUrl}/${url}`;
  const checkUrl = `${baseUrl}/api/user/${url}`;
  const newClientUrl = `${baseApiUrl}/${url}`;
  const router = useRouter();
  const urlMap = {
    client: clientUrl,
    admin: adminUrl,
    check: checkUrl,
    newClient: newClientUrl
  };
  return $fetch<T>(urlMap[urlType], {
    ...options,
    timeout: 10000,
    credentials: "include",
    onResponseError: (error) => {
      console.error("$fetch error", error.response._data.message);
      addToast({
        duration: 3000,
        type: "danger",
        message: error.response._data.message
      });
      // #todo 想想那邊還可以在優化
      if (error.response._data.message === "驗證錯誤, 請重新登入") {
        router.push("/login");
      }
    }
  }).catch((error) => {
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
