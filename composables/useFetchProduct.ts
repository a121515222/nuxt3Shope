import { searchProducts } from "@/apis/products";

export const useFetchProducts = async (
  keyWords: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice: number | null = null,
  maxPrice: number | null = null
) => {
  const { data } = await useAsyncData(`searchProducts`, () => {
    return searchProducts(keyWords, page, limit, minPrice, maxPrice);
  });
  if (data.value?.status) {
    return {
      products: data.value.data.products,
      pagination: data.value.data.pagination
    };
  } else {
    return {
      products: [],
      pagination: {
        currentPage: 1,
        totalCount: 0,
        totalPages: 0,
        limit: 0,
        hasPrevPage: false,
        hasNextPage: false
      }
    };
  }
};
