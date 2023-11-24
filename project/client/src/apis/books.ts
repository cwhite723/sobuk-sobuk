import Api from "./api";
import KakaoApi from "./kakaoApi";

/**
 * 도서 등록 - 완료
 * @param data: BookData
 * @returns { data: BookId }
 */

export const postBook = async (
  data: BookData,
): Promise<BookIdResponse | undefined> => {
  try {
    const response = await Api.post("/books", data);
    return response.data;
  } catch (error) {
    console.error("Error in Post Book:", error);
    throw new Error("Failed to Register Book");
  }
};

/**
 * 도서 수정 - 완료
 * @param { bookId: number, data: BookData }
 * @returns { data: BookId }
 */
export const patchBook = async ({
  bookId,
  data,
}: {
  bookId: number;
  data: BookData;
}): Promise<BookIdResponse | undefined> => {
  try {
    const response = await Api.patch(`/books/${bookId}`, data);
    return response.data;
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
    return await Api.delete(`/books/${bookId}`);
  } catch (error) {
    console.error("Error in Delete Book:", error);
    throw new Error("Failed to Delete Book");
  }
};

/**
 * 도서 개별 조회 - 완료
 * @param bookId
 * @returns { data: BookInfo }
 */
export const getBook = async (bookId: number): Promise<BookResponse> => {
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
 * @param params: BookParams
 * @returns { BooksResponse }
 */
export const getAllBooks = async (
  params: BookParams,
): Promise<BooksResponse> => {
  try {
    const response = await Api.get("/books", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error in Get All Books:", error);
    throw new Error("Failed to Check All Books Info");
  }
};

/**
 * 도서 북마크 토글 - 완료
 * @param bookId
 * @param accessToken
 * @returns body{ success: boolean }
 */
export const postBookmark = async ({
  bookId,
  accessToken,
}: {
  bookId: number;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.post(`/books/${bookId}/bookmark`, null, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Post Bookmark:", error);
      throw new Error("Failed to Bookmark");
    }
  }
};

// kakao api 도서 정보 조회
export const getKakaoBooks = async (
  params: KakaoBookParams,
): Promise<KakaoBookResponse> => {
  try {
    const response = await KakaoApi.get("/book", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error in Get Kakao Books:", error);
    throw new Error("Failed to Check Kakao Books Info");
  }
};
