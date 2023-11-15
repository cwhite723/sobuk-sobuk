import Api from "./api";

/**
 * 도서 등록 - 완료
 * @param data
 * @returns body{ success: boolean, data: BookId }
 */

export const postBook = async (data: BookInfo) => {
  try {
    return Api.post("/books", data);
  } catch (error) {
    console.error("Error in Post Book:", error);
    throw new Error("Failed to Register Book");
  }
};

/**
 * 도서 수정 - 완료
 * @param patchBookVriables
 * @returns body{ success: boolean, data: BookId }
 */

export const patchBook = async (patchBookVriables: BookPatch) => {
  try {
    return Api.patch(
      `/books/${patchBookVriables.bookId}`,
      patchBookVriables.data,
    );
  } catch (error) {
    console.error("Error in Patch Book:", error);
    throw new Error("Failed to Modify Book");
  }
};

/**
 * 도서 삭제 - 완료
 * @param bookId
 * @returns body{ success: boolean }
 */

export const deleteBook = async (bookId: number) => {
  try {
    return Api.delete(`/books/${bookId}`);
  } catch (error) {
    console.error("Error in Delete Book:", error);
    throw new Error("Failed to Delete Book");
  }
};

/**
 * 도서 개별 조회 - 완료
 * @param bookId
 * @returns body{ success: boolean, data: BookInfo }
 */
export const getBook = async (bookId: number): Promise<BookInfo> => {
  try {
    const response = await Api.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error in Get Book:", error);
    throw new Error("Failed to Check Book Info");
  }
};

/**
 * 도서 다건 조회 - 완료
 * @param page
 * @param size
 * @returns body{ success: boolean, data: { content: BookInfoSimple }}
 */

export const getAllBooks = async (
  params: BookParams,
): Promise<BookInfoSimple> => {
  try {
    const response = await Api.get("/books", {
      params: { params },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Get All Books:", error);
    throw new Error("Failed to Check All Books Info");
  }
};

/**
 * 도서 북마크 토큰O 토글 - 완료
 * @param bookId
 * @returns body{ success: boolean }
 */
export const postBookMark = async (bookId: number) => {
  try {
    return Api.post(`/books/${bookId}/bookmark`);
  } catch (error) {
    console.error("Error in Post BookMark:", error);
    throw new Error("Failed to BookMark");
  }
};
