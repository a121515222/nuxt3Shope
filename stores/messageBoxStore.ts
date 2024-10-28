import { defineStore } from "pinia";
export const useMessageBoxStore = defineStore("messageBox", () => {
  const isVisible = ref(false);
  const title = ref("");
  const message = ref("");
  const type = ref<"alert" | "confirm">("alert");
  let resolvePromise: ((value: boolean) => void) | null = null;

  const showConfirm = (alertTitle: string, alertMessage: string): Promise<boolean> => {
    return new Promise((resolve) => {
      title.value = alertTitle;
      message.value = alertMessage;
      isVisible.value = true;
      type.value = "confirm";
      resolvePromise = resolve;
    });
  };
  const showAlert = (alertTitle: string, alertMessage: string): Promise<void> => {
    return new Promise((resolve) => {
      title.value = alertTitle;
      message.value = alertMessage;
      type.value = "alert";
      isVisible.value = true;
      resolvePromise = () => resolve;
    });
  };
  const handleResponse = (response: boolean) => {
    isVisible.value = false;
    if (resolvePromise) {
      resolvePromise(response);
      resolvePromise = null;
    }
  };

  const confirm = () => handleResponse(true);
  const cancel = () => handleResponse(false);
  const denial = () => handleResponse(false);
  const close = () => handleResponse(true);
  return {
    isVisible,
    title,
    message,
    type,
    showConfirm,
    confirm,
    cancel,
    showAlert,
    close,
    denial
  };
});
