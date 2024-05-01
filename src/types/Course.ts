import { Section } from "./Section";

export enum Status {
  NO_VISIBLE = 0,
  VISIBLE = 1,
}

export interface Course {
  id: number;
  title: string;
  description: string;
  status: Status;
  price: number;
  image_path: string;
  units: Section[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
