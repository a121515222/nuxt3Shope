export function useSearchbar() {
  const searchInfo = ref("");
  const minPrice = ref("");
  const maxPrice = ref("");
  const favorites = ref([]);
  const oldDate = ref("");
  const newDate = ref("");
  const isShowAutoComplete = ref(false);

  const handleCompleteListEmit = (value: string) => {
    isShowAutoComplete.value = false;
    searchInfo.value = value;
  };

  return {
    searchInfo,
    minPrice,
    maxPrice,
    favorites,
    oldDate,
    newDate,
    isShowAutoComplete,
    handleCompleteListEmit
  };
}
