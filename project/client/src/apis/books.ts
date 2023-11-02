import Api from "./api";

/**
 * 도서 등록
 * @param title
 * @param publisher
 * @param author
 * @param publicationDate
 * @param isUserInput
 * @returns
 */

export const postBook = async (
  title: string,
  publisher: string,
  author: string,
  publicationDate: string,
  isUserInput: boolean,
) => {
  return Api.post("/books", {
    title,
    publisher,
    author,
    publicationDate,
    isUserInput,
  });
};

/**
 * 도서 수정
 * @param bookId
 * @param title
 * @param publisher
 * @param author
 * @param publicationDate
 * @param isUserInput
 * @returns
 */

export const patchBook = async (
  bookId: number,
  title: string,
  publisher: string,
  author: string,
  publicationDate: string,
  isUserInput: boolean,
) => {
  return Api.patch(`/books/${bookId}`, {
    title,
    publisher,
    author,
    publicationDate,
    isUserInput,
  });
};

/**
 * 도서 삭제
 * @param bookId
 * @returns
 */

export const deleteBook = async (bookId: number) => {
  return Api.delete(`/books/${bookId}`);
};

/**
 * 도서 개별 조회
 * @param bookId
 * @returns
 */
export const getBook = async (bookId: number) => {
  const response = await Api.get(`/books/${bookId}`).then(
    (response) => response.data,
  );
  return response.data;
};

/**
 * 도서 전체 조회
 * @param page
 * @param size
 * @param sortType
 * @param title
 * @param author
 * @returns
 */

export const getAllBooks = async (
  page: number,
  size: number,
  sortType: string,
  title: string,
  author: string,
) => {
  const response = await Api.get("/books", {
    params: { page, size, sortType, title, author },
  }).then((response) => response.data);
  return response.data;
};

// 도서 북마크 처리방법 필요
