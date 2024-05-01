import { ISectionInput, Section } from "types";
import { ApiService } from "./ApiService";

export class SectionService {
  static async createSection(sectionInput: ISectionInput) {
    const { data } = await ApiService.post<Section>("/units", sectionInput);
    return data;
  }

  static async getSections(courseId: number) {
    const { data } = await ApiService.get<Section[]>(`/units/?course_id=${courseId}`);
    return data;
  }
}
