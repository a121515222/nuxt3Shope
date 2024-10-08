<script lang="ts" setup>
import { type Product } from "@/types/productTypes";
import { postCart, getCart } from "@/apis/cart";
const cartStore = useCartStore();
const { handleAddCart } = cartStore;
interface ProductCardListProps {
  productListProp: Product[];
  productIdProp?: string;
}
interface favoritesProduct {
  id: string;
  title: string;
}
const props = withDefaults(defineProps<ProductCardListProps>(), {
  productListProp: (): Product[] => [],
  productIdProp: ""
});
const isPageLoading = ref(false);
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

const guestProductDetail = (id: string): void => {
  console.log(id);
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
        <div v-for="item in props.productListProp" :key="item.id">
          <NuxtLink
            class="text-black no-underline rounded-md overflow-hidden block hover:opacity-80"
            @click.prevent="emitsInspectId(item.id)"
            :to="`/product/${item.id}`"
          >
            <div
              class="relative cardHover rounded-md dark:text-white bg-gray-200 dark:bg-gray-700"
              v-if="item.is_enabled === 1 || 4"
            >
              <img
                class="w-full h-52 object-cover rounded-t-md"
                :src="item.imageUrl"
                :alt="item.title"
              />
              <p
                class="absolute top-0 left-0 bg-secondary text-primary p-1"
                v-if="item.is_enabled === 4"
              >
                促銷中
              </p>
              <div
                class="absolute top-0 right-0 bg-third flex justify-center items-center rounded-md h-8 w-8"
              >
                <button
                  v-if="!favorites.some((fav) => fav.id === item.id)"
                  class="text-red-500 text-xl"
                  title="加入我的最愛"
                  href="#"
                  @click.stop.prevent="addFavorites(item.id, item.title)"
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
                  v-else-if="favorites.some((fav) => fav.id === item.id)"
                  @click.stop.prevent="deleteFavorites(item.id, item.title)"
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
                <div v-if="item.origin_price === item.price">
                  <span>售價{{ item.origin_price }}元</span>
                  <span>/{{ item.unit }}</span>
                </div>
                <div v-else>
                  <span class="line-through">原價{{ item.origin_price }}</span>
                  <span class="text-red-500">特價{{ item.price }}元</span>
                  <span>/{{ item.unit }}</span>
                </div>
                <button
                  class="btn btn-outline-secondary bg-secondary text-primary w-full mb-1 rounded-md hover:bg-third hover:text-primary"
                  type="button"
                  @click.stop.prevent="guestProductDetail(item.id)"
                  :disabled="shouldShowLoading(item.id)"
                  :class="{ 'cursor-not-allowed': shouldShowLoading(item.id) }"
                >
                  快速商品資訊
                </button>
                <button
                  class="btn btn-primary w-full bg-primary text-secondary rounded-md hover:bg-third hover:text-primary mb-1"
                  type="button"
                  @click.stop.prevent="handleAddCart(item.id)"
                  :disabled="shouldShowLoading(item.id)"
                  :class="{ 'cursor-not-allowed': shouldShowLoading(item.id) }"
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
  </div>
</template>
<style></style>
