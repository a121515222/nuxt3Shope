export interface Article {
  author?: string;
  id: string;
  create_at: number;
  title: string;
  description: string;
  image: string;
  isPublic: boolean;
  tag?: string[];
  num: number;
}
