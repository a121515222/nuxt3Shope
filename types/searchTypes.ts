export interface SearchButtonConfig {
  priceHighToLow?: boolean;
  priceLowToHigh?: boolean;
  dateOldToNew?: boolean;
  dateNewToOld?: boolean;
  search?: boolean;
  clearSearch?: boolean;
  favorites?: boolean;
}
export interface AutoComplete {
  autoCompleteList?: string[] | [];
}
