import { getMemberPlans } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMemberPlansQuery = <TData = MemberPlansResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  memberId: number | null,
  options?: UseQueryOptions<MemberPlansResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_PLANS_BY_MEMBER_ID(params, memberId, token),
    () => getMemberPlans({ params, memberId, accessToken: token }),
    options,
  );
};

export default useMemberPlansQuery;
