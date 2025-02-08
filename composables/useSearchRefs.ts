import { ref, type Ref } from "vue";
import { type SearchButtonConfig } from "~/types/searchTypes";
interface SearchRefs {
  searchInfo?: Ref<string>;
  minPrice?: Ref<string>;
  maxPrice?: Ref<string>;
  favorites?: Ref<string[]>;
  oldDate?: Ref<string>;
  newDate?: Ref<string>;
}

export function useSearchRefs(config: SearchButtonConfig): SearchRefs {
  const searchRefs: SearchRefs = {};

  if (config.search) {
    searchRefs.searchInfo = ref("");
  }

  if (config.priceHighToLow || config.priceLowToHigh) {
    searchRefs.minPrice = ref("");
    searchRefs.maxPrice = ref("");
  }
  if (config.favorites) {
    searchRefs.favorites = ref([]);
  }

  return searchRefs;
}
