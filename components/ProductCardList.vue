<script lang="ts" setup>
import type { AdminProduct } from "@/types/adminProductTypes";
const cartStore = useCartStore();
const { handleAddCart } = cartStore;
interface ProductCardListProps {
  productListProp: AdminProduct[];
  productIdProp?: string;
}
interface favoritesProduct {
  id: string;
  title: string;
}
const props = withDefaults(defineProps<ProductCardListProps>(), {
  productListProp: (): AdminProduct[] => [],
  productIdProp: ""
});
const shouldShowLoading = (id: string) => {
  return id === props.productIdProp;
};

const favorites = ref<favoritesProduct[]>([]);
const emits = defineEmits(["inspectId"]);
const emitsInspectId = (id: string): void => {
  emits("inspectId", id);
};
const addFavorites = (id: string, title: string): void => {
  favorites.value.push({ id, title });
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
const deleteFavorites = (id: string, title: string): void => {
  const removeIndex = favorites.value.findIndex((fav) => fav.id === id && fav.title === title);
  if (removeIndex !== -1) {
    favorites.value.splice(removeIndex, 1);
  }
};
interface ProductModalDataType {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  discount: number | null;
  unit: string;
  userId: string;
  content: string;
  imagesUrl: string[];
  tag: string[];
  num: number;
}
const productModalData = ref<ProductModalDataType>({
  _id: "",
  title: "",
  description: "",
  imageUrl: "",
  price: 0,
  discount: 0,
  unit: "",
  userId: "",
  content: "",
  imagesUrl: [],
  tag: [],
  num: 0
});
const productModalRef = ref<{ modalShow: () => void } | null>(null);
const openModal = () => {
  if (productModalRef.value) {
    productModalRef.value.modalShow();
  }
};
const openProductModal = (index: number): void => {
  const {
    _id,
    title,
    description,
    imageUrl,
    imagesUrl,
    price,
    discount,
    unit,
    userId,
    content,
    tag
  } = props.productListProp[index];
  productModalData.value = {
    _id,
    title,
    description,
    imageUrl,
    imagesUrl,
    price,
    discount,
    unit,
    userId,
    content,
    tag,
    num: 1
  };
  openModal();
};
const addNum = () => {
  if (productModalData.value.num >= 99) return;
  productModalData.value.num += 1;
};
const minusNum = () => {
  if (productModalData.value.num <= 1) return;
  productModalData.value.num -= 1;
};
const handleModalConfirm = async () => {
  console.log("handleModalConfirm");
};
onMounted(() => {
  if (process.client) {
    favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
  }
});
</script>
<template>
  <div class="pt-3">
    <div v-if="props.productListProp.length > 0">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 mb-3">
        <div v-for="(item, index) in props.productListProp" :key="item._id">
          <NuxtLink
            class="text-black no-underline rounded-md overflow-hidden block hover:opacity-80"
            @click.prevent="emitsInspectId(item._id)"
            :to="`/product/${item._id}`"
          >
            <div
              class="relative cardHover rounded-md dark:text-white bg-gray-200 dark:bg-gray-700"
              v-if="item.productStatus !== 'notListed'"
            >
              <ImageWithErrorHandler
                :alt="item.title"
                :src="item.imageUrl"
                :class="'w-full h-52 object-cover rounded-t-md'"
              ></ImageWithErrorHandler>
              <p
                class="absolute top-0 left-0 bg-secondary text-primary p-1"
                v-if="item.productStatus === 'onSale'"
              >
                促銷中
              </p>
              <div
                class="absolute top-0 right-0 bg-third flex justify-center items-center rounded-md h-8 w-8"
              >
                <button
                  v-if="!favorites.some((fav) => fav.id === item._id)"
                  class="text-red-500 text-xl"
                  title="加入我的最愛"
                  href="#"
                  @click.stop.prevent="addFavorites(item._id, item.title)"
                >
                  <svg
                    class="w-6 h-6 text-secondary"
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
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                </button>
                <button
                  class="text-red-500 text-xl"
                  title="移除我的最愛"
                  href="#"
                  v-else-if="favorites.some((fav) => fav.id === item._id)"
                  @click.stop.prevent="deleteFavorites(item._id, item.title)"
                >
                  <svg
                    class="w-6 h-6 text-secondary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
                    />
                  </svg>
                </button>
              </div>
              <div class="p-3">
                <h3 class="text-lg font-bold">{{ item.title }}</h3>
                <p class="line-clamp-2 min-h-[48px]">
                  {{ removePTag(item.description) }}
                </p>
              </div>
              <div class="border-t-0 px-3 pb-2">
                <div v-if="item.price === (item.price ?? 0) - (item.discount ?? 0)">
                  <span>售價{{ item.price }}元</span>
                  <span>/{{ item.unit }}</span>
                </div>
                <div v-else>
                  <span class="line-through">原價{{ item.price }}</span>
                  <span class="text-red-500"
                    >特價{{ (item.price ?? 0) - (item.discount ?? 0) }}元</span
                  >
                  <span>/{{ item.unit }}</span>
                </div>
                <button
                  class="btn btn-outline-secondary bg-secondary text-primary w-full mb-1 rounded-md hover:bg-third hover:text-primary"
                  type="button"
                  @click.stop.prevent="openProductModal(index)"
                  :disabled="shouldShowLoading(item._id)"
                  :class="{ 'cursor-not-allowed': shouldShowLoading(item._id) }"
                >
                  快速商品資訊
                </button>
                <button
                  class="btn btn-primary w-full bg-primary text-secondary rounded-md hover:bg-third hover:text-primary mb-1"
                  type="button"
                  @click.stop.prevent="handleAddCart(item._id, item.userId, 1, item.title)"
                  :disabled="shouldShowLoading(item._id)"
                  :class="{ 'cursor-not-allowed': shouldShowLoading(item._id) }"
                >
                  加到購物車
                </button>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else-if="props.productListProp.length === 0">
      <h2 class="mx-auto">搜尋不到東西</h2>
    </div>
    <Modal
      ref="productModalRef"
      :modalPropsId="'adminProductModal'"
      :modalPropsTitle="productModalData.title"
      :modalIsShowConfirmButton="false"
      @modalConfirm="handleModalConfirm"
    >
      <div class="grid grid-cols-3 gap-4">
        <div class="md:col-span-2 col-span-3">
          <ImageWithErrorHandler
            :alt="productModalData.title"
            :src="productModalData.imageUrl"
            :class="'w-full  object-cover rounded-md'"
          ></ImageWithErrorHandler>
        </div>
        <div class="md:col-span-1 col-span-3 dark:text-white flex flex-col justify-between">
          <div>
            <div class="flex gap-4">
              <h3 class="text-2xl">{{ productModalData.title }}</h3>

              <div class="flex gap-2">
                <span
                  v-for="(tag, index) in productModalData.tag"
                  :key="tag + index"
                  class="badge bg-primary px-2 py-1 rounded-full text-secondary"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div v-html="productModalData.content"></div>
            <div
              class="py-2"
              v-if="
                productModalData.price ===
                (productModalData.price ?? 0) - (productModalData.discount ?? 0)
              "
            >
              <span class="dark:text-secondary text-primary"
                >售價{{ productModalData.price }}元</span
              >
              <span>/{{ productModalData.unit }}</span>
            </div>
            <div class="py-2" v-else>
              <span class="line-through">原價{{ productModalData.price }}</span>
              <span class="text-red-500"
                >特價{{ (productModalData.price ?? 0) - (productModalData.discount ?? 0) }}元</span
              >
              <span>/{{ productModalData.unit }}</span>
            </div>
          </div>
          <div class="flex justify-between items-center text-white">
            <button
              class="px-2 py-2 bg-primary rounded-md hover:bg-third hover:text-primary"
              @click="minusNum"
            >
              <svg
                class="w-6 h-6"
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
            <p class="text-gray-800 dark:text-white">{{ productModalData.num }}</p>
            <button
              class="px-2 py-2 bg-primary rounded-md hover:bg-third hover:text-primary"
              @click="addNum"
            >
              <svg
                class="w-6 h-6"
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
              class="btn btn-primary py-2 px-2 bg-primary text-secondary rounded-md hover:bg-third hover:text-primary"
              type="button"
              @click="
                handleAddCart(
                  productModalData._id,
                  productModalData.userId,
                  productModalData.num,
                  productModalData.title
                )
              "
              :disabled="shouldShowLoading(productModalData._id)"
              :class="{ 'cursor-not-allowed': shouldShowLoading(productModalData._id) }"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<style></style>
