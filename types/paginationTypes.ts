export interface Pagination {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
