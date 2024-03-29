import { getAllBooks, getBook, getKakaoBooks } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

// 도서 단일 조회
export const useBookQuery = <TData = BookResponse>(
  bookId: number | null,
  options?: UseQueryOptions<BookResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOK_BY_BOOK_ID(bookId),
    () => getBook(bookId),
    options,
  );
};

// 도서 전체 조회
export const useBooksQuery = <TData = BooksResponse>(
  bookParams: BookParams,
  options?: UseQueryOptions<BooksResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOKS_BY_BOOK_PARAMS(bookParams),
    () => getAllBooks(bookParams),
    options,
  );
};

// 카카오 북 초회
export const useBooksKakaoQuery = <TData = KakaoBookResponse>(
  params: KakaoBookParams,
  options?: UseQueryOptions<KakaoBookResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOKS_KAKAO_BY_PARAMS(params),
    () => getKakaoBooks(params),
    options,
  );
};
