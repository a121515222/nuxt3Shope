export interface SearchButtonConfig {
  priceHightToLow?: boolean;
  priceLowToHight?: boolean;
  dateOldToNew?: boolean;
  dateNewToNew?: boolean;
  search?: boolean;
  clearSearch?: boolean;
  favorites?: boolean;
}
export interface AutoCompleteProps {
  autoCompleteListProp?: string[];
  isShowAutoCompleteProp?: boolean;
}
