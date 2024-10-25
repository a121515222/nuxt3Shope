<script lang="ts" setup>
import dayjs from "dayjs";
const indexStore = useIndexStore();
const { isDarkMode } = storeToRefs(indexStore);
const datePickerRef = ref<HTMLElement | null>(null);
const articles = ref([
  {
    author: "測試",
    create_at: 1682380800,
    description: "測試2",
    id: "-NTtUHn_iug2d8gmBAyD",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    tag: ["555555"],
    title: "測試",
    num: 1
  },
  {
    author: "測試",
    create_at: 1683072000,
    description: "測試",
    id: "-NTtIqHuqXu7fRPWeSyO",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    tag: ["33335555555"],
    title: "測試",
    num: 2
  },
  {
    author: "測試",
    create_at: 1682553600,
    description: "測試",
    id: "-NTtIhN9HALu2qwESBS4",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    title: "測試",
    num: 3
  },
  {
    author: "測試2",
    create_at: 1682380800,
    description: "測試",
    id: "-NTtI15rUokHiEklQ1cJ",
    image: "",
    isPublic: false,
    title: "測試",
    num: 4
  },
  {
    author: "測試2",
    create_at: 1682380800,
    description: "測試2",
    id: "-NTtFiag7E2_44j3GW_w",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    title: "測試2",
    num: 5
  },
  {
    author: "測試",
    create_at: 1682380800,
    description: "測試",
    id: "-NTtElFR-0J6jCwcCIt3",
    image: "",
    isPublic: false,
    title: "測試",
    num: 6
  },
  {
    author: "測試",
    create_at: 1682467200,
    description: "測試",
    id: "-NTtEWVNooOkiUN-h5GO",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    title: "測試",
    num: 7
  },
  {
    author: "測試",
    create_at: 1682553600,
    description: "測試",
    id: "-NTtDvvFtB6Xc_AereUv",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    title: "測試",
    num: 8
  },
  {
    author: "測試",
    create_at: 1682553600,
    description: "測試",
    id: "-NTtCtjNyMDiFZ_nSmyc",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    tag: ["666666666", "", ""],
    title: "測試",
    num: 9
  },
  {
    author: "測試2",
    create_at: 1682380800,
    description: "測試",
    id: "-NTtCcT-1EQ26zxJ6eum",
    image: "https://upload.cc/i1/2022/02/06/nMIKtu.jpg",
    isPublic: false,
    title: "測試",
    num: 10
  }
]);
const isLoading = ref(false);
const isAddNewArticle = ref(false);
const postId = ref("");
const modalData = ref({
  title: "",
  author: "",
  create_at: new Date(),
  description: "",
  id: "",
  imageUrl: "",
  isPublic: false,
  tag: []
});
const modalRef = ref<{ modalShow: () => void } | null>(null);
const openModal = (item: string = "") => {
  if (modalRef.value) {
    modalRef.value.modalShow();
    if (typeof item !== "string" && item.id) {
      modalData.value = item;
    }
  }
};
const handleDeleteAdminArticle = () => {};
const handleModalConfirm = () => {
  console.log("handleModalConfirm", modalData.value);
};
const testFn = () => {
  console.log("testFn");
};
const uploadImg = () => {};
const addImg = () => {};
const deleteImg = () => {};
const editorData = ref("");
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
onMounted(() => {
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
                  <samp
                    v-for="tag in item.tag"
                    :key="tag + index"
                    class="text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-third text-white"
                    >{{ tag }}</samp
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
          <p class="p-1">一共有 {{ articles.length }} 項產品</p>
        </div>
        <!--  #todo   放分頁Component -->

        <!-- <Pagination :pagination="paginationData" @changePage="handleChangePage" /> -->
      </div>
    </div>
  </div>

  <Modal
    ref="modalRef"
    :modalPropsId="'adminProductModal'"
    :modalPropsTitle="isAddNewArticle ? '新增產品' : '產品編輯'"
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
            :disabled="isLoading || modalData.imageUrl === ''"
            @change="uploadImg"
            :class="{
              'cursor-not-allowed opacity-50': isLoading || modalData.imageUrl === ''
            }"
          />
        </div>
        <div>
          <img
            class="w-full h-auto"
            :src="modalData.imageUrl || '/defaultImg/image-1@2x.jpg'"
            :alt="modalData.title + ' picture'"
            :title="modalData.title"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productImageUrl">文章]圖片</label>
          <input
            class="block inputStyle"
            type="text"
            id="productImageUrl"
            placeholder="請輸入文章圖片網址"
            v-model.trim.lazy="modalData.imageUrl"
          />
        </div>

        <button
          class="btn btn-outline-success w-full block my-3 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          v-if="modalData.imageUrl"
          :disabled="modalData.imageUrl === ''"
          @click="addImg()"
        >
          新增圖片
        </button>
        <button
          class="btn btn-outline-danger w-full block bg-red-500 text-white hover:bg-red-600"
          v-if="modalData.imageUrl"
          @click="deleteImg()"
        >
          刪除圖片
        </button>
      </div>

      <div class="col-span-3">
        <div class="grid grid-cols-2 gap-4">
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
        </div>

        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="articleContent">文章內容</label>
          <TheCkeditor v-model="editorData"></TheCkeditor>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style></style>
