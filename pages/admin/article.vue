<script lang="ts" setup>
// #todo image 與 imageUrl 變數名稱可以選一個使用
import dayjs from "dayjs";
import {
  getAdminArticles,
  getAdminArticle,
  postAdminArticle,
  putAdminArticle,
  deleteAdminArticle
} from "@/apis/adminArticle";
import { postAdminImageUpload } from "@/apis/adminUpload";
import { type AdminArticle } from "@/types/adminArticleTypes";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const { addToast } = useToastStore();
const { isDarkMode } = storeToRefs(indexStore);
const messageBoxStore = useMessageBoxStore();
const { showAlert } = messageBoxStore;
const datePickerRef = ref<HTMLElement | null>(null);
const articles = ref<AdminArticle[]>([]);
const isAddNewArticle = ref(false);
const postId = ref("");
const modalData = ref<AdminArticle>({
  title: "",
  author: "",
  create_at: new Date(),
  description: "",
  id: "",
  image: "",
  isPublic: false,
  tag: [],
  content: "",
  num: 0
});

const modalRef = ref<{ modalShow: () => void } | null>(null);
const openModal = async (item: string | AdminArticle = "") => {
  if (modalRef.value) {
    modalRef.value.modalShow();
    if (typeof item !== "string" && item.id) {
      const res = await getAdminArticle(item.id);
      modalData.value = {
        ...item,
        content: res.article.content,
        create_at: new Date(item.create_at)
      };
    } else {
      modalData.value = {
        title: "",
        author: "",
        create_at: new Date().getTime(),
        description: "",
        id: "",
        image: "",
        isPublic: false,
        tag: [],
        content: "",
        num: 0
      };
    }
  }
};
const handleAdminArticleModalData = async () => {
  if (!modalData.value?.content || modalData.value?.content === "") {
    await showAlert("警告", "請輸入文章內容");
    return;
  }
  if (!modalData.value?.tag) {
    modalData.value.tag = [];
  }
  modalData.value.create_at = new Date(modalData.value.create_at).getTime();
};
const handleGetAdminArticles = async (page: number = 1) => {
  const res = await getAdminArticles(page);
  if (res.success) {
    articles.value = res.articles;
    paginationData.value = res.pagination;
  }
};
const handleAddAdminArticle = async () => {
  await handleAdminArticleModalData();
  try {
    isLoading.value = true;
    const res = await postAdminArticle(modalData.value);
    if (res.success) {
      addToast({ type: "success", message: "新增成功" });
      await handleGetAdminArticles();
    } else {
      addToast({ type: "danger", message: "新增失敗" });
    }
  } catch (error) {
    addToast({ type: "danger", message: "新增失敗" });
  } finally {
    isLoading.value = false;
  }
};
const handleEditAdminArticle = async () => {
  await handleAdminArticleModalData();
  try {
    isLoading.value = true;
    const res = await putAdminArticle(modalData.value);
    if (res.success) {
      addToast({ type: "success", message: "編輯成功" });
      await handleGetAdminArticles();
    } else {
      addToast({ type: "danger", message: "編輯失敗" });
    }
  } catch (error) {
    addToast({ type: "danger", message: "編輯失敗" });
  } finally {
    isLoading.value = false;
  }
};
const handleDeleteAdminArticle = async (id: string) => {
  isLoading.value = true;
  const res = await deleteAdminArticle(id);
  if (res.success) {
    addToast({ type: "success", message: "刪除成功" });
    await handleGetAdminArticles();
  } else {
    addToast({ type: "danger", message: "刪除失敗" });
  }
  isLoading.value = false;
};
const handleModalConfirm = async (id: string) => {
  if (isAddNewArticle.value) {
    await handleAddAdminArticle();
  } else {
    await handleEditAdminArticle();
  }
};
const uploadFileRef = ref<HTMLInputElement | null>(null);
const uploadImg = async () => {
  if (uploadFileRef.value) {
    const files = uploadFileRef.value.files;
    if (!files) {
      addToast({ type: "danger", message: "No file selected" });
      return;
    }
    const file = files[0];
    const res = await postAdminImageUpload(file);
    if (res.success) {
      if (res.imageUrl) {
        if (!modalData.value.image) {
          modalData.value.image = res.imageUrl;
        }
        addToast({ type: "success", message: "上傳成功" });
      }
    } else {
      addToast({ type: "danger", message: "上傳失敗" });
    }
  }
};
const deleteImg = () => {
  modalData.value.image = "";
};
const showDate = computed(() => {
  return dayjs(modalData.value.create_at).format("YYYY-MM-DD");
});
const showDatePicker = () => {
  if (datePickerRef.value) {
    datePickerRef.value.classList.remove("hidden");
  }
};
const hideDatePicker = () => {
  if (datePickerRef.value) {
    datePickerRef.value.classList.add("hidden");
  }
};
// 監聽外部點擊事件
const handleClickOutside = (event: MouseEvent) => {
  // 檢查是否為左鍵點擊
  if (event.button !== 0) return;

  // 如果日期選擇器存在且點擊位置不在日期選擇器內
  if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
    hideDatePicker();
  }
};
const handleTagDelete = (index: number) => {
  if (!modalData.value?.tag) {
    return;
  } else {
    modalData.value.tag.splice(index, 1);
  }
};
const handleAddTag = () => {
  if (modalData.value?.tag === undefined) {
    modalData.value.tag = [];
  }
  if (modalData.value.tag.length < 5) {
    modalData.value.tag.push("");
  }
};
const paginationData = ref();
const handleChangePage = async (page: number) => {
  await handleGetAdminArticles(page);
};
onMounted(async () => {
  await handleGetAdminArticles();
  document.addEventListener("mousedown", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
<template>
  <div class="container mx-auto px-6">
    <div class="py-5 dark:text-white">
      <h2 class="text-2xl font-semibold">文章列表</h2>
      <div class="flex justify-end mb-3">
        <!-- Button trigger modal -->
        <button
          class="btn bg-primary text-white hover:opacity-80 px-4 py-2 rounded-lg border-primary"
          type="button"
          @click="
            isAddNewArticle = true;
            openModal();
          "
        >
          增加文章
        </button>
      </div>
      <div class="w-full my-3">
        <div class="border rounded-lg bg-gray-400 dark:bg-gray-500 overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr class="text-nowrap">
                <th class="px-4 py-2">發布日期</th>
                <th class="px-4 py-2">文章標題</th>
                <th class="px-4 py-2">作者</th>
                <th class="px-4 py-2">標籤</th>
                <th class="px-4 py-2">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in articles"
                :key="item.id + index"
                class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
                :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
              >
                <td class="border px-4 py-2 text-center" v-timeFormat="item.create_at"></td>
                <td class="border px-4 py-2 text-center">{{ item.title }}</td>
                <td class="border px-4 py-2 text-center">{{ item.author }}</td>
                <td class="border px-4 py-2">
                  <span
                    v-for="tag in item.tag"
                    :key="tag + index"
                    class="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-third text-white"
                    >{{ tag }}</span
                  >
                </td>
                <td class="border px-4 py-2 flex justify-center gap-4">
                  <button
                    class="border-primary border-2 px-4 py-2 rounded-lg hover:bg-primary"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item.id;
                      isAddNewArticle = false;
                      openModal(item);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    編輯
                  </button>
                  <button
                    class="border border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-500"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item.id;
                      handleDeleteAdminArticle(item.id);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="p-1">一共有 {{ articles.length }} 篇文章</p>
        </div>
        <Pagination :pagination="paginationData" @changePage="handleChangePage" />
      </div>
    </div>
  </div>

  <Modal
    ref="modalRef"
    :modalPropsId="'adminProductModal'"
    :modalPropsTitle="isAddNewArticle ? '新增文章' : '文章編輯'"
    @modalConfirm="handleModalConfirm"
  >
    <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4 my-3">
      <div class="col-span-1">
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productImageUrl">
            圖片上傳
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="isLoading"
            ></span>
          </label>
          <input
            class="block dark:text-white rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-700 w-full placeholder-gray-400"
            type="file"
            name="file-to-upload"
            ref="uploadFileRef"
            :disabled="isLoading || modalData.image !== ''"
            @change="uploadImg"
            :class="{
              'cursor-not-allowed opacity-50': isLoading || modalData.image !== ''
            }"
          />
        </div>
        <div>
          <img
            class="w-full h-auto"
            :src="modalData.image || '/defaultImg/image-1@2x.jpg'"
            :alt="modalData.title + ' picture'"
            :title="modalData.title"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productImageUrl">文章圖片</label>
          <input
            class="block inputStyle"
            type="text"
            id="productImageUrl"
            placeholder="請輸入文章圖片網址"
            v-model.trim.lazy="modalData.image"
          />
        </div>

        <!-- <button
          class="btn btn-outline-success rounded-lg w-full block my-3 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          v-if="modalData.image"
          :disabled="modalData.image === ''"
          @click="addImg()"
        >
          新增圖片
        </button> -->
        <button
          class="btn btn-outline-danger rounded-lg w-full block bg-red-500 text-white hover:bg-red-600"
          v-if="modalData.image"
          @click="deleteImg()"
        >
          刪除圖片
        </button>
      </div>

      <div class="col-span-3">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="mb-3">
            <label class="block col-span-1 text-gray-700 dark:text-white" for="articleTitle"
              >文章標題</label
            >
            <input
              class="block inputStyle"
              id="productName"
              placeholder="請輸入文章標題"
              v-model.trim="modalData.title"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="articleAuthor">文章作者</label>
            <input
              class="block inputStyle"
              type="text"
              id="productContent"
              placeholder="請輸入文章作者"
              v-model.trim="modalData.author"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="articleCreateDate"
              >文章日期</label
            >
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                class="text-sm rounded-lg ps-10 p-2.5 block dark:placeholder-gray-400 dark:text-white w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
                placeholder="請選擇文章日期"
                v-model="showDate"
                @focus="showDatePicker"
              />
              <div ref="datePickerRef" class="absolute z-10 hidden">
                <VDatePicker
                  v-model="modalData.create_at"
                  :is-dark="isDarkMode"
                  @dayclick="hideDatePicker"
                />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="articleCreateDate"
              >是否公開</label
            >
            <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" v-model="modalData.isPublic" />
              <div
                class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
              ></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </div>
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="articleTag">文章標籤</label>
          <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div v-for="(t, index) in modalData.tag" :key="index + t" class="relative">
              <input
                type="text"
                id="search-dropdown"
                class="inputStyle"
                placeholder="請輸入文章標籤"
                :value="t"
              />
              <button
                type="submit"
                class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-red-500 hover:bg-red-600 rounded-e-lg"
                @click="handleTagDelete(index)"
              >
                刪除
              </button>
            </div>
            <button
              v-if="!(modalData.tag?.length === 5)"
              class="btn btn-outline-success rounded-lg block p-2 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed0"
              @click="handleAddTag"
            >
              新增
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="articleContent">文章內容</label>
          <TheCkeditor v-model="modalData.content"></TheCkeditor>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style></style>
