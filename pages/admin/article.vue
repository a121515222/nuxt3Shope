<script lang="ts" setup>
import type { AdminArticle } from "@/types/adminArticleTypes";
import {
  getUserArticles,
  getUserArticleById,
  postUserArticle,
  putUserArticle,
  deleteUserArticle
} from "@/apis/adminArticle";
import { postImageUpload } from "@/apis/adminUpload";
import { handleImageError } from "@/utils/imageHandler";
import { generateArticleContentByGeminiAI } from "@/apis/geminiAIAPI";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const { addToast } = useToastStore();
const { isDarkMode } = storeToRefs(indexStore);
const messageBoxStore = useMessageBoxStore();
const { showAlert } = messageBoxStore;
const datePickerRef = ref<HTMLElement | null>(null);
const { showDatePicker, hideDatePicker, formateShowDate } = useDatePicker(datePickerRef);
const articleList = ref<AdminArticle[]>([]);
const isAddNewArticle = ref(false);
const postId = ref("");
const modalData = ref<AdminArticle>({
  title: "",
  author: "",
  articleDate: new Date(),
  description: "",
  _id: "",
  imageUrl: "",
  isPublic: false,
  tag: [],
  content: "",
  userId: ""
});
const currentPagination = ref({ page: 1, limit: 10 });
const modalRef = ref<{ modalShow: () => void; modalHide: () => void } | null>(null);
const openModal = async (item: string | AdminArticle = "") => {
  if (modalRef.value) {
    modalRef.value.modalShow();
    if (typeof item !== "string" && item._id) {
      const res = await getUserArticleById(item._id);
      modalData.value = {
        ...item,
        content: res.data.content,
        articleDate: new Date(item.articleDate)
      };
    } else {
      modalData.value = {
        title: "",
        author: "",
        articleDate: new Date().getTime(),
        description: "",
        _id: "",
        imageUrl: "",
        isPublic: false,
        tag: [],
        content: "",
        updatedAt: new Date().getTime(),
        userId: ""
      };
    }
  }
};
const closeModal = () => {
  if (modalRef.value) {
    modalRef.value.modalHide();
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
  modalData.value.articleDate = new Date(modalData.value.articleDate).getTime();
};
const handleGetAdminArticles = async (page: number = 1, limit: number = 10) => {
  const res = await getUserArticles(page, limit);
  if (res.status) {
    articleList.value = res.data.articles;
    paginationData.value = res.data.pagination;
  }
};
const handleAddAdminArticle = async () => {
  await handleAdminArticleModalData();
  try {
    isLoading.value = true;
    modalData.value.userId = localStorage.getItem("userId") ?? "";
    const res = await postUserArticle(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "新增成功" });
      if (articleList.value.length === currentPagination.value.limit) {
        currentPagination.value.page = paginationData.value.totalPages + 1;
      }
      await handleGetAdminArticles(currentPagination.value.page);
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
    const res = await putUserArticle(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "編輯成功" });
      await handleGetAdminArticles(currentPagination.value.page);
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
  const res = await deleteUserArticle(id);
  if (res.status) {
    addToast({ type: "success", message: "刪除成功" });
    if (articleList.value.length === 1 && currentPagination.value.page > 1) {
      currentPagination.value.page -= 1;
    }
    await handleGetAdminArticles(currentPagination.value.page);
  } else {
    addToast({ type: "danger", message: "刪除失敗" });
  }
  isLoading.value = false;
};
const handleModalConfirm = async (id: string) => {
  if (isAddNewArticle.value) {
    await handleAddAdminArticle();
    closeModal();
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
    const userId = localStorage.getItem("userId") ?? "";
    try {
      isLoading.value = true;
      const res = await postImageUpload(file, userId);
      if (res.status) {
        modalData.value.imageUrl = res.data.imageUrl;
        addToast({ type: "success", message: "上傳成功" });
      } else {
        addToast({ type: "danger", message: "上傳失敗" });
      }
    } catch (error) {
    } finally {
      uploadFileRef.value.value = "";
      isLoading.value = false;
    }
  }
};
const deleteImg = () => {
  modalData.value.imageUrl = "";
};
const formateDate = computed(() => {
  return formateShowDate(modalData.value.articleDate);
});

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
  currentPagination.value.page = page;
  await handleGetAdminArticles(page);
};

const handProductContentByGemini = async () => {
  const { title, description, tag, content } = modalData.value;
  if (!title && !description && tag.length === 0 && !content) {
    showAlert("請填寫完整資料", "產品標題、描述、標籤、內容需要有資料才能使用AI生成");
    return;
  }
  try {
    isLoading.value = true;
    const res = await generateArticleContentByGeminiAI({
      title,
      description,
      tag,
      content
    });
    if (res.status) {
      modalData.value.content = res.data;
    } else {
      addToast({ type: "danger", message: "生成失敗" });
    }
  } catch (error) {
    isLoading.value = false;
    addToast({ type: "danger", message: "生成失敗" });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await handleGetAdminArticles();
});
onUnmounted(() => {});
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
                v-for="(item, index) in articleList"
                :key="item._id + index"
                class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
                :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
              >
                <td class="border px-4 py-2 text-center" v-timeFormat="item.articleDate"></td>
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
                      postId = item._id;
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
                      postId = item._id;
                      handleDeleteAdminArticle(item._id);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="p-1">一共有 {{ articleList.length }} 篇文章</p>
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
            :disabled="isLoading || modalData.imageUrl !== ''"
            @change="uploadImg"
            :class="{
              'cursor-not-allowed opacity-50': isLoading || modalData.imageUrl !== ''
            }"
          />
        </div>
        <div>
          <ImageWithErrorHandler
            :class="'w-full h-auto'"
            :src="modalData.imageUrl"
            :alt="modalData.title + ' picture'"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productImageUrl">文章圖片</label>
          <input
            class="block inputStyle"
            type="text"
            id="productImageUrl"
            placeholder="請輸入文章圖片網址"
            v-model.trim.lazy="modalData.imageUrl"
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
          v-if="modalData.imageUrl"
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
                class="text-sm rounded-lg ps-10 block dark:placeholder-gray-400 dark:text-white w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
                placeholder="請選擇文章日期"
                v-model="formateDate"
                @focus="showDatePicker"
              />
              <div ref="datePickerRef" class="absolute z-10 hidden">
                <VDatePicker
                  v-model="modalData.articleDate"
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
            <div v-for="(t, index) in modalData.tag" :key="index" class="relative">
              <input
                type="text"
                id="search-dropdown"
                class="inputStyle"
                placeholder="請輸入文章標籤"
                v-model="modalData.tag[index]"
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
          <label class="block col-span-1 text-gray-700 dark:text-white" for="articleTitle"
            >文章描述</label
          >
          <input
            class="block inputStyle"
            placeholder="文章描述"
            v-model.trim="modalData.description"
          />
        </div>
        <div class="mb-3">
          <div class="flex justify-between pb-2">
            <label class="block text-gray-700 dark:text-white" for="articleContent">文章內容</label>
            <button
              class="bg-primary px-2 py-1 border-rounded text-secondary rounded-lg"
              @click="handProductContentByGemini"
            >
              AI幫我寫
            </button>
          </div>

          <TheCkeditor v-model="modalData.content"></TheCkeditor>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style></style>
