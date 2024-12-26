import type { userInfoUpdateDataType } from "@/types/userInfoTypes";
import { defineStore } from "pinia";
import { useIndexStore } from "@/stores/indexStore";

export const useUserStore = defineStore("useUserStore", () => {
  const indexStore = useIndexStore();
  const { userId } = storeToRefs(indexStore);
  const userInfo = ref<userInfoUpdateDataType>({
    username: "",
    email: "",
    tel: "",
    address: "",
    birthday: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    gender: null,
    id: userId.value
  });
  // userInfo的userId有改變連著indexStore的userId也會跟著改變,以防萬一
  watch(userId, (value) => {
    userInfo.value.id = value;
  });

  return {
    userInfo
  };
});
