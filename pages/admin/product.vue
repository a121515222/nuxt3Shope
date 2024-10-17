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
const modalRef = ref(null);

// const editor = ref(ClassicEditor);
const editorData = ref("");
const productStatus = (isEnabled) => {
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
watch(editorData, (newVal) => {
  console.log(newVal);
});
</script>
<template>
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
              <td class="border px-4 py-2">{{ productStatus(item.is_enabled) }}</td>
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
                :src="productTemp.imageUrl"
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
            <img class="w-full object-cover" :src="img" :alt="productTemp.title" />
          </div>
        </div>
      </template>
      <p v-else>請選擇一個商品查看</p>
    </div>
  </div>
  <Modal ref="modalRef" :modalPropsId="'adminProductModal'">
    <TheCkeditor v-model="editorData"></TheCkeditor>
  </Modal>
</template>
<style></style>
