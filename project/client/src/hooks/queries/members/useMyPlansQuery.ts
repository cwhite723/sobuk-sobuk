import { getMyPlans } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMyPlansQuery = <TData = MemberPlansResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  options?: UseQueryOptions<MemberPlansResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_PLANS(params, token),
    () => getMyPlans({ params, accessToken: token }),
    options,
  );
};

export default useMyPlansQuery;
