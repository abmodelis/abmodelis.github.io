import { Dayjs } from "dayjs";

export interface IUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  birth_date: Dayjs | string;
  specialization_area_id: number;
}
