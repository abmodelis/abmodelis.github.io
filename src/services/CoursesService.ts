import { Course, ICourseInput } from "../types";
import { ApiService } from "./ApiService";

export class CoursesService {
  static async getCourses() {
    const response = await ApiService.get<Course[]>("/courses");
    return response.data;
  }

  static async getCourse(id: string) {
    const response = await ApiService.get<Course>(`/courses/${id}`);
    response.data.price = response.data.price / 100;
    return response.data;
  }

  static async createCourse(courseInput: ICourseInput) {
    if (!courseInput.image) return;
    const formData = new FormData();
    formData.append("file", courseInput.image);
    const course = await ApiService.multipart<{ image_url: string }>("/multimedia/images", formData).then(
      async ({ data: { image_url } }) => {
        const { data } = await ApiService.post<Course>("/courses", {
          ...courseInput,
          price: courseInput.price * 100,
          image_path: image_url,
        });
        return data;
      },
    );
    return course;
  }

  static async updateCourse(id: string | number, courseInput: ICourseInput) {
    const sendData = async ({ data: { image_url } }: { data: { image_url?: string | null } }) => {
      const { data } = await ApiService.put<Course>(`/courses/${id}`, {
        ...courseInput,
        price: courseInput.price * 100,
        image_path: image_url,
      });
      return data;
    };

    if (!courseInput.image) {
      return sendData({ data: { image_url: courseInput.image_url } });
    }
    const formData = new FormData();
    formData.append("file", courseInput.image);
    const course = await ApiService.multipart<{ image_url: string }>(`/multimedia/images`, formData).then(sendData);
    return course;
  }

  static async softDeleteCourse(id: string | number) {
    return ApiService.delete(`/courses/${id}`);
  }
}
