import { getKakaoBooks } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useBooksKakaoQuery = <TData = KakaoBookResponse>(
  params: KakaoBookParams,
  options?: UseQueryOptions<KakaoBookResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.BOOKS_KAKAO_BY_PARAMS(params),
    () => getKakaoBooks(params),
    options,
  );
};

export default useBooksKakaoQuery;
