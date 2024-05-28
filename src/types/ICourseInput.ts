import { Status } from ".";

export interface ICourseInput {
  title: string;
  description: string;
  status: Status;
  price: number;
  image: File | null;
  image_url?: string | null;
  restore?: boolean;
}
