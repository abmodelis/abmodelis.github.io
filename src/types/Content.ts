export interface Content {
  id: number;
  title: string;
  html_text: string;
  media_path: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  unit_id: number;
}
