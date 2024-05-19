import { Dayjs } from "dayjs";

export interface IUserInput {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: Dayjs;
    specializationAreaId: number;
  }