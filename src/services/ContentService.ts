import { Content, IContentInput } from "types";
import { ApiService } from "./ApiService";

export class ContentService {
  static async createContent(contentInput: IContentInput) {
    const { data } = await ApiService.post<Content>("/contents", contentInput);
    return data;
  }

  static async updateContent(id: number, contentInput: IContentInput) {
    const { data } = await ApiService.put<Content>(`/contents/${id}`, contentInput);
    return data;
  }

  static async deleteContent(id: number) {
    return ApiService.delete(`/contents/${id}`);
  }
}
