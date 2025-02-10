import type { Pagination } from "@/types/paginationTypes";
export interface CommentDataType {
  comment: string;
  score: number;
  commentId: string | null;
}

export interface CommentResponseType {
  status: boolean;
  message: string;
  data: {
    _id: string;
    sellerId: string;
    userId: string;
    orderId: string;
    comment: string;
    score: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface buyerGetSellerCommentDataType {
  _id: string;
  sellerId: string;
  comment: string;
  score: number;
  createdAt: string;
  commenterName: string;
  orderInfo: {
    productId: string;
    title: string;
    imageUrl: string;
  };
}

export interface FetchCommentDataType {
  data: {
    comments: buyerGetSellerCommentDataType[];
    pagination: Pagination;
  };
  message: string;
  status: boolean;
}
