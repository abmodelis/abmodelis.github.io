export class MediaServices {
  static async getImage(path: string) {
    if (!path.startsWith("http")) return null;
    path = path.replace("http", "https");
    try {
      const response = await fetch(path);
      const fileName = path.split("/").pop();
      const blob = await response.blob();
      return new File([blob], fileName || "image.png", { type: "image/png" });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
