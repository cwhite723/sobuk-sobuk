import Api from "./api";

export const postImage = async (imageData: FormData) => {
  try {
    const response = await Api.post("/images", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Post Images:", error);
    throw new Error("Failed to Register Image");
  }
};
