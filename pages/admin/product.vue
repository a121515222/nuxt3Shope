<script lang="ts" setup>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const isNew = ref(false);
const products = ref([
  {
    id: "",
    title: "",
    origin_price: "",
    price: "",
    unit: "",
    is_enabled: true,
    category: "",
    description: "",
    content: "",
    imageUrl: "",
    imagesUrl: []
  }
]);
// 暫時寫死 isLoading 為 false
const isLoading = ref(false);
const postId = ref("");
const productTemp = ref({
  id: "",
  title: "",
  origin_price: "",
  price: "",
  unit: "",
  is_enabled: true,
  category: "",
  description: "",
  content: "",
  imageUrl: "",
  imagesUrl: []
});
const modalData = ref({
  id: "",
  title: "",
  origin_price: "",
  price: "",
  unit: "",
  is_enabled: 1,
  category: "",
  description: "",
  content: "",
  imageUrl: "",
  imagesUrl: []
});
const productStatus = ref([
  { value: 0, status: "未上架" },
  { value: 1, status: "已上架" },
  { value: 2, status: "缺貨中" },
  { value: 3, status: "補貨中" },
  { value: 4, status: "促銷中" },
  { value: 5, status: "待下架" }
]);
const modalRef = ref<{ modalShow: () => void } | null>(null);

// const editor = ref(ClassicEditor);
const editorData = ref("");
const shouldProductActive = (isEnabled) => {
  return isEnabled === 1 ? "啟用" : "未啟用";
};
const deleteProduct = () => {
  console.log("deleteProduct");
};
const showProduct = (item) => {
  productTemp.value = item;
};
const openModal = (item) => {
  if (modalRef.value) {
    modalRef.value.modalShow();
  }
};
const uploadImg = () => {
  console.log("uploadImg");
};
const addImg = () => {
  console.log("addImg");
};
const deleteImg = () => {
  console.log("deleteImg");
};
watch(editorData, (newVal) => {
  console.log(newVal);
});
</script>
<template>
  <div class="container mx-auto">
    <div class="py-5 dark:text-white">
      <h2 class="text-2xl font-semibold">產品列表</h2>
      <div class="flex justify-end mb-3">
        <!-- Button trigger modal -->
        <button
          class="btn btn-primary"
          type="button"
          @click="
            isNew = true;
            openModal();
          "
        >
          增加商品
        </button>
      </div>
      <div class="w-full my-3">
        <div class="border rounded-lg bg-gray-400 dark:bg-gray-700">
          <table class="min-w-full table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2">產品名稱</th>
                <th class="px-4 py-2">原價</th>
                <th class="px-4 py-2">售價</th>
                <th class="px-4 py-2">單位</th>
                <th class="px-4 py-2">是否啟用</th>
                <th class="px-4 py-2">查看細節</th>
                <th class="px-4 py-2"></th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in products"
                :key="item.id + index"
                class="hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <td class="border px-4 py-2">{{ item.title }}</td>
                <td class="border px-4 py-2">{{ item.origin_price }}</td>
                <td class="border px-4 py-2">{{ item.price }}</td>
                <td class="border px-4 py-2">{{ item.unit }}</td>
                <td class="border px-4 py-2">{{ shouldProductActive(item.is_enabled) }}</td>
                <td class="border px-4 py-2">
                  <button class="btn btn-outline-primary" type="button" @click="showProduct(item)">
                    查看細節
                  </button>
                </td>
                <td class="border px-4 py-2">
                  <button
                    class="btn btn-outline-success"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item.id;
                      isNew = false;
                      openModal(item);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    編輯
                  </button>
                </td>
                <td class="border px-4 py-2">
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item.id;
                      deleteProduct();
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="p-1">一共有 {{ products.length }} 項產品</p>
        </div>
        <!--  #todo   放分頁Component -->

        <!-- <PaginationComponent :pagination="page" @send-page="getProduct" /> -->
      </div>

      <h2 class="text-2xl font-semibold mt-6">單一產品細節</h2>
      <div class="w-full lg:w-2/3 mx-auto py-3">
        <template v-if="productTemp.id">
          <div class="card">
            <div class="card-body">
              <div class="img">
                <img
                  class="w-full object-cover"
                  :src="productTemp.imageUrl || '../../public/defaultImg/image-1@2x.jpg'"
                  :alt="productTemp.title"
                />
              </div>
              <div class="flex items-center">
                <p class="text-lg">
                  {{ productTemp.title }}
                  <span class="badge bg-primary">{{ productTemp.category }}</span>
                </p>
              </div>
              <h3 class="text-lg font-semibold mt-2">商品描述:</h3>
              <p v-html="productTemp.description"></p>
              <p>商品內容: {{ productTemp.content }}</p>
              <div class="flex items-center space-x-2">
                <span class="text-xl">{{ productTemp.price }} 元</span>
                <span class="line-through text-gray-500">{{ productTemp.origin_price }}</span>
                <span>元/{{ productTemp.unit }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-3 py-3">
            <div class="w-1/4" v-for="(img, index) in productTemp.imagesUrl" :key="img + index">
              <img
                class="w-full object-cover"
                :src="img || '../../public/defaultImg/image-1@2x.jpg'"
                :alt="productTemp.title"
              />
            </div>
          </div>
        </template>
        <p v-else>請選擇一個商品查看</p>
      </div>
    </div>
  </div>

  <Modal ref="modalRef" :modalPropsId="'adminProductModal'">
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
            ref="upLoadFile"
            :disabled="isLoading || modalData.imagesUrl?.length === 5"
            @change="uploadImg"
            :class="{
              'cursor-not-allowed opacity-50': isLoading || modalData.imagesUrl?.length === 5
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
          <label class="block text-gray-700 dark:text-white" for="productImageUrl"
            >主要產品圖片</label
          >
          <input
            class="block inputStyle"
            type="text"
            id="productImageUrl"
            placeholder="請輸入主要產品圖片網址"
            v-model.trim.lazy="modalData.imageUrl"
          />
        </div>
        <template v-if="modalData.imageUrl">
          <div class="mb-3" v-for="(item, index) in modalData.imagesUrl" :key="item + 1">
            <p>其他圖片 {{ index + 1 }}</p>
            <img class="w-full h-auto" :src="item" :alt="modalData.title" />
            <label class="block text-gray-700 dark:text-white">其他產品圖片 {{ index + 1 }}</label>
            <input
              class="block inputStyle"
              type="text"
              placeholder="請輸其他產品圖片網址"
              v-model.trim.lazy="modalData.imagesUrl[index]"
            />
          </div>
        </template>
        <button
          class="btn btn-outline-success w-full block my-3 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          v-if="modalData.imageUrl"
          :disabled="modalData.imagesUrl?.length === 5"
          @click="addImg()"
        >
          新增圖片
        </button>
        <button
          class="btn btn-outline-danger w-full block bg-red-500 text-white hover:bg-red-600"
          v-if="modalData.imagesUrl?.length > 1"
          @click="deleteImg()"
        >
          刪除圖片
        </button>
      </div>

      <div class="col-span-3">
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productName">產品名稱</label>
          <input
            class="block inputStyle"
            id="productName"
            placeholder="請輸入產品名稱"
            v-model.trim="modalData.title"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productCategory">產品分類</label>
          <input
            class="block inputStyle"
            type="text"
            id="productCategory"
            placeholder="請輸入產品分類"
            v-model.trim="modalData.category"
          />
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productContent">產品內容</label>
          <input
            class="block inputStyle"
            type="text"
            id="productContent"
            placeholder="請輸入產品內容"
            v-model.trim="modalData.content"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="productOrigin_price"
              >產品原價</label
            >
            <input
              class="block inputStyle"
              type="number"
              id="productOrigin_price"
              placeholder="請輸入產品原價"
              min="0"
              v-model.number="modalData.origin_price"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="productPrice">產品售價</label>
            <input
              class="block inputStyle"
              type="number"
              id="productPrice"
              placeholder="請輸入產品售價"
              min="0"
              v-model.number="modalData.price"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="is_enabled">產品狀態</label>
            <select class="block inputStyle" id="is_enabled" v-model.number="modalData.is_enabled">
              <option value="" disabled>請選擇產品狀態</option>
              <option v-for="status in productStatus" :key="status.value" :value="status.value">
                {{ status.status }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-gray-700 dark:text-white" for="productUnit">產品單位</label>
            <input
              class="block inputStyle"
              type="text"
              id="productUnit"
              placeholder="請輸入產品單位"
              v-model.trim="modalData.unit"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productDescription"
            >產品描述</label
          >
          <TheCkeditor v-model="editorData"></TheCkeditor>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style></style>
