export interface Content {
  id: number;
  html_text: string;
  media_path: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
