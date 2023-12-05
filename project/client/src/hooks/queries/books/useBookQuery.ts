import { getBook } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useBookQuery = <TData = BookResponse>(
  bookId: number | null,
  options?: UseQueryOptions<BookResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOK_BY_BOOK_ID(bookId),
    () => getBook(bookId),
    options,
  );
};

export default useBookQuery;
