import { getMyPage } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMyPageQuery = <TData = MemberResponse>(
  token: string | null,
  options?: UseQueryOptions<MemberResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_PAGE_BY_TOKEN(token),
    () => getMyPage(token),
    options,
  );
};

export default useMyPageQuery;
