import { IClassesInput, Classes } from "types";
import { ApiService } from "./ApiService";

export class ClassesService {
  static async createClass(classesInput: IClassesInput) {
    const { data } = await ApiService.post<Classes>("/contents", classesInput);
    return data;
  }

  static async getClass(contentId: number) {
    const { data } = await ApiService.get<Classes[]>(`/contents/?content_id=${contentId}`);
    return data;
  }
}