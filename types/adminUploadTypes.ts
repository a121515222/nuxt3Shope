export interface AdminUnloadImageResponse {
  status: boolean;
  message: string;
  data: {
    imageUrl: string;
  };
}
