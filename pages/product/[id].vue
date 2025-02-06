<script lang="ts" setup>
import { getProductById } from "@/apis/products";
import type { Product } from "@/types/productTypes";
import { handleImageError } from "@/utils/imageHandler";
const cartStore = useCartStore();
const { handleAddCart } = cartStore;
const route = useRoute();
const product = ref<Product>({
  _id: "",
  title: "",
  category: [],
  content: "",
  description: "",
  imageUrl: "",
  imagesUrl: [],
  price: 0,
  unit: "",
  updatedAt: "",
  createdAt: "",
  userId: "",
  discount: 0,
  tag: [],
  productStatus: "outOfStock",
  num: 0,
  sellerInfo: {
    username: "",
    averageScore: 0
  }
});
const images = ref<string[]>([]);
const qty = ref(1);
const pictureShowIndex = ref(0);
const changePicture = (index: number) => {
  pictureShowIndex.value = index;
};
const addCart = async (productId: string, sellerId: string, num: number, productTitle: string) => {
  const res = await handleAddCart(productId, sellerId, num, productTitle);
};
onMounted(async () => {
  if (!route.params.id) {
    return;
  } else {
    const res = await getProductById(route.params.id as string);
    product.value = res.data || {
      id: "",
      title: "",
      category: "",
      content: "",
      description: "",
      imageUrl: "",
      imagesUrl: [],
      origin_price: 0,
      price: 0,
      unit: "",
      is_enabled: 0,
      createdAt: "",
      updatedAt: ""
    };
    images.value = res.data.imagesUrl || [];
  }
});
</script>
<template>
  <div class="container mx-auto max-w-7xl py-8">
    <div
      class="flex flex-col md:flex-row mx-0 card bg-gray-200 dark:bg-gray-700 rounded-lg dark:text-white"
    >
      <div class="w-full lg:w-1/2">
        <template v-if="images.length > 2">
          <div class="h-[360px] overflow-hidden rounded-lg">
            <img
              class="object-cover w-full h-full"
              :src="images[pictureShowIndex]"
              :alt="`${product.title} picture`"
              loading="lazy"
            />
          </div>
        </template>
        <template v-else-if="images.length <= 2">
          <div class="h-[360px] overflow-hidden">
            <img
              class="object-cover w-full h-full rounded-lg"
              :src="product.imageUrl"
              :alt="`${product.title} picture`"
              loading="lazy"
              @error="handleImageError"
            />
          </div>
        </template>
      </div>
      <div class="w-full lg:w-1/2 flex flex-col justify-between">
        <div class="from-group p-2">
          <h2 class="font-bold text-2xl">{{ product.title }}</h2>
          <div class="text-lg" v-html="product.content"></div>
        </div>
        <div class="from-group pr-2 pb-2">
          <template v-if="product.discount === 0">
            <div class="flex justify-end gap-2 pr-2">
              <span>售價{{ product.price }}元</span>
              <span>/{{ product.unit }}</span>
            </div>
          </template>
          <template v-else-if="product.discount ?? 0 > 0">
            <div class="flex justify-end gap-2 pr-2">
              <span class="line-through">原價{{ product.price }}</span>
              <span class="text-red-500"
                >特價{{ (product.price ?? 0) - (product.discount ?? 0) }}元</span
              >
              <span>/{{ product.unit }}</span>
            </div>
          </template>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              class="btn btn-primary text-nowrap"
              @click="qty -= 1"
              :disabled="qty < 2"
              :class="{ 'cursor-not-allowed': qty < 2 }"
            >
              <svg
                class="w-6 h-6 text-primary dark:text-secondary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span class="self-center px-1" style="min-width: 20px">{{ qty }}</span>
            <button
              type="button"
              class="text-nowrap"
              @click="qty += 1"
              :disabled="qty === 100"
              :class="{ 'cursor-not-allowed': qty === 100 }"
            >
              <svg
                class="w-6 h-6 text-primary dark:text-secondary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </button>
            <button
              type="button"
              class="text-primary dark:text-secondary text-nowrap bg-secondary dark:bg-primary rounded-lg px-4 py-2 hover:opacity-80"
              @click="addCart(product._id, product.userId, qty, product.title)"
              :disabled="qty < 1"
              :class="{ 'cursor-not-allowed': qty < 1 }"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 py-3" v-if="images.length > 2">
        <h3 class="text-xl font-bold dark:text-white">產品圖片</h3>
        <div class="flex gap-3">
          <div class="w-24 h-24" v-for="(i, index) in images" :key="i + index">
            <a href="#" @click.prevent="changePicture(index)">
              <img
                class="object-cover w-full h-full rounded-lg"
                :src="i"
                :alt="product.title + ' picture ' + index"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="col-12 my-3" v-if="filterProducts.length > 0">
        <h3 class="text-xl font-bold">推薦產品</h3>
      </div> -->
    </div>
  </div>
</template>
<style></style>
