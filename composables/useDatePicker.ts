import dayjs from "dayjs";
export function useDatePicker(
  elementRef: Ref<HTMLElement | null> // 需要監聽的元素引用
) {
  const showDatePicker = () => {
    if (elementRef.value) {
      elementRef.value.classList.remove("hidden");
    }
  };
  const hideDatePicker = () => {
    if (elementRef.value) {
      elementRef.value.classList.add("hidden");
    }
  };
  const formateShowDate = (date: string | Date | number) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleClickOutside = (event: MouseEvent) => {
    // 確保點擊是左鍵
    if (event.button !== 0) return;

    // 如果元素存在且點擊的目標不在元素內部
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      hideDatePicker();
    }
  };

  // 在掛載時添加事件監聽器，卸載時移除
  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });
  return { showDatePicker, hideDatePicker, formateShowDate };
}
