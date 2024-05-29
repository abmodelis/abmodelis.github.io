import { Content } from "./Content";

export interface Section {
  id: number;
  title: string;
  contents: Array<Content>;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
