import { getAllBooks } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useBooksQuery = <TData = BooksResponse>(
  bookParams: BookParams,
  options?: UseQueryOptions<BooksResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOKS_BY_BOOK_PARAMS(bookParams),
    () => getAllBooks(bookParams),
    options,
  );
};

export default useBooksQuery;
