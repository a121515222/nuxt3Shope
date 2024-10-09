import { defineStore } from "pinia";
interface ToastData {
  duration: number;
  type: "success" | "danger" | "warning";
  message: string;
}
export const useToastStore = defineStore("toastStore", () => {
  const toastList = ref<ToastData[]>([]);
  const addToast = (data: ToastData) => {
    toastList.value.push(data);
  };
  return {
    toastList,
    addToast
  };
});
