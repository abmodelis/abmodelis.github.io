import { AxiosError } from "axios";
import dayjs from "dayjs";
import { IUserInput } from "types";
import { ApiService } from "./ApiService";

export class AuthService {
  static async signUp(userInput: IUserInput) {
    const inputData = {
      ...userInput,
      birth_date: dayjs(userInput.birth_date).format("YYYY-MM-DD"),
    };
    try {
      return await ApiService.post<IUserInput>("/auth/signup", inputData);
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          const msg = (error.response?.data.detail as Array<{ msg: string }>)
            .map((value) => {
              return value.msg;
            })
            .join("\n");
          throw new Error(msg);
        }
        throw new Error(error.response?.data?.detail ?? "Error al registrar");
      }
      throw new Error("Error al registrar");
    }
  }
}
