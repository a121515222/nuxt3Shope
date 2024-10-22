// https://vue3-course-api.hexschool.io/v2/api/chun-chia/admin/upload
import { useBaseFetch } from "@/utils/fetch";
import { type AdminUnloadImageResponse } from "@/types/adminUploadTypes";
export function postAdminImageUpload(file: File) {
  const api_token = getCookie("token");
  const formData = new FormData();
  formData.append("file-to-upload", file);
  return useBaseFetch<AdminUnloadImageResponse>("admin/upload", {
    method: "POST",
    headers: {
      Authorization: `${api_token}`
    },
    body: formData
  });
}
