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
  const refs: SearchRefs = {};

  if (config.search) {
    refs.searchInfo = ref("");
  }

  if (config.priceHightToLow || config.priceLowToHight) {
    refs.minPrice = ref("");
    refs.maxPrice = ref("");
  }
  if (config.favorites) {
    refs.favorites = ref([]);
  }

  return refs;
}

// // Usage in your component
// const props = defineProps<SearchButtonConfig>();
// const { searchInfo, minPrice, maxPrice, favorites, oldDate, newDate } =
//   useSearchRefs(props);
