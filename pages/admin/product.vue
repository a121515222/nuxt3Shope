<script lang="ts" setup>
import type { AdminProduct } from "@/types/adminProductTypes";
import {
  getUserProducts,
  postUserProduct,
  putUserProduct,
  deleteUserProduct
} from "@/apis/adminProduct";
import { productStatusConfig } from "@/utils/config";
import { handleImageError } from "@/utils/imageHandler";
import { postImageUpload } from "@/apis/adminUpload";
import { generateProductContentByGeminiAI } from "@/apis/geminiAIAPI";
const messageBoxStore = useMessageBoxStore();
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
const { showConfirm, showAlert } = messageBoxStore;
const { addToast } = useToastStore();
const isAddNewProduct = ref(false);
const productsList = ref<AdminProduct[]>([]);
const postId = ref("");
const productTemp = ref<AdminProduct>({
  _id: "",
  title: "",
  price: null,
  unit: "",
  productStatus: "notListed",
  category: [],
  description: "",
  content: "",
  imageUrl: "",
  imagesUrl: [],
  tag: [],
  num: null,
  userId: "",
  discount: null,
  createdAt: new Date(),
  updatedAt: new Date()
});
const modalData = ref<AdminProduct>({
  _id: "",
  title: "",
  price: null,
  unit: "",
  productStatus: "notListed",
  category: [],
  description: "",
  content: "",
  imageUrl: "",
  imagesUrl: [],
  tag: [],
  num: null,
  userId: "",
  discount: null,
  createdAt: new Date(),
  updatedAt: new Date()
});
const resetModalData = () => {
  modalData.value = {
    _id: "",
    title: "",
    price: null,
    unit: "",
    productStatus: "notListed",
    category: [],
    description: "",
    content: "",
    imageUrl: "",
    imagesUrl: [],
    tag: [],
    num: null,
    userId: "",
    discount: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
const currentPagination = ref({ page: 1, limit: 10 });
const modalRef = ref<{ modalShow: () => void } | null>(null);
const sellPrice = computed(() => {
  return (modalData.value.price ?? 0) - (modalData.value.discount ?? 0) === 0
    ? "價格錯誤"
    : (modalData.value.price ?? 0) - (modalData.value.discount ?? 0);
});
const paginationData = ref();
const handleGetAdminProducts = async (page: number = 1, limit: number = 10) => {
  const res = await getUserProducts(page, limit);
  const { products, pagination } = res.data;
  productsList.value = products;
  paginationData.value = pagination;
};
const handleModalConfirm = async () => {
  const isValid = await Promise.all([
    handlePriceValidate(),
    handleDiscountValidate(),
    handleProductNumValidate()
  ]).then((result) => result.every(Boolean));
  if (!isValid) {
    return;
  }
  if (isAddNewProduct.value) {
    // #todo 可以塞驗證
    await handleAddProduct();
  } else {
    // #todo 可以塞驗證
    await handleEditProduct();
  }
};

const handleAddProduct = async () => {
  try {
    isLoading.value = true;
    if (process.client) {
      modalData.value.userId = localStorage.getItem("userId") ?? "";
    }
    const res = await postUserProduct(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "新增成功" });
      await handleGetAdminProducts();
    } else {
      addToast({ type: "danger", message: "新增失敗" });
    }
  } catch (error) {
    addToast({ type: "danger", message: "新增失敗" });
  } finally {
    isLoading.value = false;
  }
};
const handleEditProduct = async () => {
  try {
    isLoading.value = true;
    if (process.client) {
      modalData.value.userId = localStorage.getItem("userId") ?? "";
    }

    const res = await putUserProduct(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "編輯成功" });
      await handleGetAdminProducts(currentPagination.value.page);
    } else {
      addToast({ type: "danger", message: "編輯失敗" });
    }
  } catch (error) {
    addToast({ type: "danger", message: "編輯失敗" });
  } finally {
    isLoading.value = false;
  }
};
const handleDeleteAdminProduct = async (id: string) => {
  const result = await showConfirm("確定要刪除產品嗎?", "刪除商品");
  if (result) {
    const res = await deleteUserProduct(id);
    if (res.status) {
      addToast({ type: "success", message: "刪除成功" });
      await handleGetAdminProducts();
    } else {
      addToast({ type: "danger", message: "刪除失敗" });
    }
  } else {
    addToast({ type: "warning", message: "取消刪除" });
  }
};

const showProduct = (item: AdminProduct) => {
  productTemp.value = item;
};
const openModal = (item: string | AdminProduct = "") => {
  if (modalRef.value) {
    modalRef.value.modalShow();
    if (typeof item !== "string" && item._id) {
      modalData.value = item;
    }
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
    const res = await postImageUpload(file, userId);
    if (res.status) {
      if (!modalData.value.imagesUrl) {
        modalData.value.imagesUrl = [];
      }
      if (res.data.imageUrl) {
        if (!modalData.value.imageUrl) {
          modalData.value.imageUrl = res.data.imageUrl;
        } else {
          if (!modalData.value.imagesUrl) {
            modalData.value.imagesUrl = [];
          }
          modalData.value.imagesUrl.push(res.data.imageUrl);
        }
        addToast({ type: "success", message: "上傳成功" });
      }
    } else {
      addToast({ type: "danger", message: "上傳失敗" });
    }
    uploadFileRef.value.value = "";
  }
};
const addImg = () => {
  if (!modalData.value.imagesUrl) {
    modalData.value.imagesUrl = [];
  }
  if (modalData.value.imagesUrl.length === 5) {
    return;
  } else {
    modalData.value.imagesUrl.push("");
  }
};
const deleteImg = () => {
  if (!modalData.value.imagesUrl) return;
  modalData.value.imagesUrl.pop();
};
const handleChangePage = async (page: number) => {
  currentPagination.value.page = page;
  await handleGetAdminProducts(page);
};

const handProductContentByGemini = async () => {
  const { title, description, tag, content, category } = modalData.value;
  if (!title || !description || !tag || !content) {
    showAlert("請填寫完整資料", "產品標題、描述、標籤、內容需要有資料才能使用AI生成");
    return;
  }
  try {
    isLoading.value = true;
    const res = await generateProductContentByGeminiAI({
      title,
      description,
      category,
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

const { validateInput } = useInputValidate();

const priceValidateConfig = {
  productPriceRule: {
    fn: () => productPriceAndDiscountRule(modalData.value.price, modalData.value.discount),
    errorMessage: "折扣價格不能大於原價"
  },
  productPriceCanNotBeZero: {
    fn: () => productPriceAndBeZeroAndBelowZero(modalData.value.price),
    errorMessage: "價格不能為0或小於0"
  }
};
const discountValidateConfig = {
  productPriceRule: {
    fn: () => productPriceAndDiscountRule(modalData.value.price, modalData.value.discount),
    errorMessage: "折扣價格不能大於原價"
  },
  discountCanNotBelowZero: {
    fn: () => discountCanNotBelowZero(modalData.value.discount),
    errorMessage: "折扣價格不能小於0"
  }
};
const productNumValidateConfig = {
  productNumRule: {
    fn: () => productNumRule(),
    errorMessage: "數量不能小於0"
  }
};
const productNumRule = () => {
  return modalData.value.num !== null && modalData.value.num >= 0;
};
const productPriceAndDiscountRule = (price: number | null, discount: number | null) => {
  if (price === null) {
    return true;
  } else {
    return price >= (discount ?? 0);
  }
};
const productPriceAndBeZeroAndBelowZero = (price: number | null) => {
  return price !== null && price !== 0;
};
const discountCanNotBelowZero = (discount: number | null) => {
  return discount !== null && discount >= 0;
};
const handlePriceValidate = async () => {
  try {
    const result = await validateInput(
      priceValidateConfig,
      priceErrorMessageRef.value as HTMLParagraphElement,
      priceRef.value as HTMLInputElement
    );
    return result;
  } catch (error) {
    console.warn("Validation failed:", error);
  }
};
const handleDiscountValidate = async () => {
  try {
    const result = await validateInput(
      discountValidateConfig,
      discountErrorMessageRef.value as HTMLParagraphElement,
      discountRef.value as HTMLInputElement
    );
    return result;
  } catch (error) {
    console.warn("Validation failed:", error);
  }
};
const handleProductNumValidate = async () => {
  try {
    const result = await validateInput(
      productNumValidateConfig,
      productNumErrorMessageRef.value as HTMLParagraphElement,
      productNumRef.value as HTMLInputElement
    );
    return result;
  } catch (error) {
    console.warn("Validation failed:", error);
  }
};
const priceRef = ref();
const priceErrorMessageRef = ref();
const discountRef = ref();
const discountErrorMessageRef = ref();
const productNumRef = ref();
const productNumErrorMessageRef = ref();
onMounted(async () => {
  await handleGetAdminProducts();
});
</script>
<template>
  <div class="container mx-auto px-6 py-5 dark:text-white">
    <h2 class="text-2xl font-semibold">產品列表</h2>
    <div class="flex justify-end mb-3">
      <!-- Button trigger modal -->
      <button
        class="btn bg-primary text-white hover:opacity-80 px-4 py-2 rounded-lg border-primary"
        type="button"
        @click="
          isAddNewProduct = true;
          openModal();
          resetModalData();
        "
      >
        增加商品
      </button>
    </div>
    <div class="w-full my-3">
      <div class="border rounded-lg bg-gray-400 dark:bg-gray-500 overflow-x-auto">
        <table class="min-w-full table-auto">
          <thead>
            <tr class="text-nowrap">
              <th class="px-4 py-2">產品名稱</th>
              <th class="px-4 py-2">原價</th>
              <th class="px-4 py-2">售價</th>
              <th class="px-4 py-2">單位</th>
              <th class="px-4 py-2">貨物狀態</th>
              <th class="px-4 py-2">查看細節</th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in productsList"
              :key="item._id + index"
              class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
              :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
            >
              <td class="border px-4 py-2 text-center">{{ item.title }}</td>
              <td class="border px-4 py-2 text-center">{{ item.price }}</td>
              <td class="border px-4 py-2 text-center">
                {{
                  (item.price ?? 0) - (item.discount ?? 0) === 0
                    ? "價格錯誤"
                    : (item.price ?? 0) - (item.discount ?? 0)
                }}
              </td>
              <td class="border px-4 py-2 text-center">{{ item.unit }}</td>
              <td class="border px-4 py-2 text-center">
                {{ productStatusConfig[item.productStatus]?.showText || "" }}
              </td>
              <td class="border px-4 py-2 text-center">
                <button class="btn btn-outline-primary" type="button" @click="showProduct(item)">
                  預覽
                </button>
              </td>
              <td class="border px-4 py-2 flex justify-center gap-4">
                <button
                  class="border-primary border-2 px-4 py-2 rounded-lg hover:bg-primary"
                  type="button"
                  :disabled="isLoading"
                  :class="{ 'cursor-not-allowed': isLoading }"
                  @click="
                    postId = item._id;
                    isAddNewProduct = false;
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
                    handleDeleteAdminProduct(item._id);
                  "
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="p-1">一共有 {{ productsList.length }} 項產品</p>
      </div>

      <Pagination :pagination="paginationData" @changePage="handleChangePage" />
    </div>

    <h2 class="text-2xl font-semibold mt-6">單一產品細節</h2>
    <div class="w-full lg:w-2/3 mx-auto py-3">
      <template v-if="productTemp._id">
        <div class="card">
          <div class="card-body">
            <div class="img">
              <img
                class="w-full object-cover"
                :src="productTemp.imageUrl"
                :alt="productTemp.title"
                @error="handleImageError"
                loading="lazy"
              />
            </div>
            <h3 class="text-lg font-semibold mt-2">商品標題:</h3>
            <p class="text-lg">
              {{ productTemp.title }}
            </p>
            <h3 class="text-lg font-semibold mt-2">商品分類:</h3>
            <div class="flex items-center space-x-2">
              <span
                v-for="(item, index) in productTemp.category"
                :key="item + index"
                class="badge bg-primary"
              >
                {{ item }}
              </span>
            </div>
            <h3 class="text-lg font-semibold mt-2">商品標籤:</h3>
            <div class="flex items-center space-x-2">
              <span
                v-for="(tag, index) in productTemp.tag"
                :key="tag + index"
                class="badge bg-primary"
              >
                {{ tag }}
              </span>
            </div>

            <h3 class="text-lg font-semibold mt-2">商品描述:</h3>
            <div v-html="productTemp.description"></div>
            <h3 class="text-lg font-semibold mt-2">商品內容:</h3>
            <div v-html="productTemp.content"></div>
            <div class="flex items-center space-x-2">
              <span class="text-xl">{{ productTemp.price }} 元</span>
              <span class="line-through text-gray-500">{{ productTemp.price }}</span>
              <span>元{{ productTemp.unit }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-3 py-3">
          <div class="w-1/4" v-for="(img, index) in productTemp.imagesUrl" :key="img + index">
            <img
              class="w-full object-cover"
              :src="img"
              @error="handleImageError"
              :alt="productTemp.title"
              loading="lazy"
            />
          </div>
        </div>
      </template>
      <p v-else>請選擇一個商品查看</p>
    </div>
  </div>

  <Modal
    ref="modalRef"
    :modalPropsId="'adminProductModal'"
    :modalPropsTitle="isAddNewProduct ? '新增產品' : '產品編輯'"
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
            @error="handleImageError"
            :alt="modalData.title + ' picture'"
            :title="modalData.title"
            loading="lazy"
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
            <img
              class="w-full h-auto"
              :src="item || '/defaultImg/image-1@2x.jpg'"
              @error="handleImageError"
              :alt="modalData.title"
              loading="lazy"
            />
            <label class="block text-gray-700 dark:text-white">其他產品圖片 {{ index + 1 }}</label>
            <input
              class="block inputStyle"
              type="text"
              placeholder="請輸其他產品圖片網址"
              v-model.trim.lazy="(modalData.imagesUrl ?? [])[index]"
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
          v-if="modalData.imagesUrl && modalData.imagesUrl.length >= 1"
          @click="deleteImg()"
        >
          刪除圖片
        </button>
      </div>

      <div class="col-span-1 md:col-span-3">
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
          <label class="block text-gray-700 dark:text-white" for="productCategory">產品標籤</label>
          <AddTag v-model="modalData.tag"></AddTag>
        </div>
        <div class="mb-3">
          <label class="block text-gray-700 dark:text-white" for="productContent">產品描述</label>
          <input
            class="block inputStyle"
            type="text"
            id="productContent"
            placeholder="請輸入產品內容"
            v-model.trim="modalData.description"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-6 relative">
            <label class="block text-gray-700 dark:text-white" for="productOrigin_price"
              >產品原價</label
            >
            <input
              ref="priceRef"
              class="block inputStyle"
              type="number"
              id="productPrice"
              placeholder="請輸入產品原價"
              min="0"
              v-model.number="modalData.price"
              @blur="handlePriceValidate"
            />
            <p
              ref="priceErrorMessageRef"
              class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
            ></p>
          </div>
          <div class="mb-6 relative">
            <label class="block text-gray-700 dark:text-white" for="productPrice">產品折扣</label>
            <input
              ref="discountRef"
              class="block inputStyle"
              type="number"
              id="productDiscount"
              placeholder="請輸入產品折扣價格"
              min="0"
              v-model.number="modalData.discount"
              @blur="handleDiscountValidate"
            />
            <p
              ref="discountErrorMessageRef"
              class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
            ></p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-6 relative">
            <label class="block text-gray-700 dark:text-white" for="productNum">產品數量</label>
            <input
              ref="productNumRef"
              class="block inputStyle"
              type="number"
              id="productNum"
              placeholder="請輸入產品數量"
              min="0"
              v-model.number="modalData.num"
              @blur="handleProductNumValidate"
            />
            <p
              ref="productNumErrorMessageRef"
              class="w-full h-1/2 px-4 text-xs lg:text-sm text-red-600 dark:text-red-500 opacity-0 z-0 absolute left-0 bottom-[-36px]"
            ></p>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-white" for="productTag">產品售價</label>
            <input
              class="block inputStyle"
              type="number"
              id="productSellPrice"
              placeholder=""
              disabled
              :value="sellPrice"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-white" for="productStatus">產品狀態</label>
            <select
              class="block inputStyle"
              id="productStatus"
              v-model.number="modalData.productStatus"
            >
              <option value="" disabled>請選擇產品狀態</option>
              <option
                v-for="status in productStatusConfig"
                :key="status.value"
                :value="status.value"
              >
                {{ status.showText }}
              </option>
            </select>
          </div>
          <div class="mb-6">
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
        <div class="mb-6">
          <label class="block text-gray-700 dark:text-white" for="productDescription"
            >產品內容</label
          >
          <button
            class="bg-primary px-2 py-1 border-rounded text-secondary rounded-lg"
            @click="handProductContentByGemini"
          >
            AI幫我寫
          </button>
          <TheCkeditor v-model="modalData.content"></TheCkeditor>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style></style>
