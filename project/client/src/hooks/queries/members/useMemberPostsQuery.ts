import { getMemberPosts } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMemberPostsQuery = <TData = MemberPostsResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  memberId: number | null,
  options?: UseQueryOptions<MemberPostsResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_POSTS_BY_MEMBER_ID(params, memberId, token),
    () => getMemberPosts({ params, memberId, accessToken: token }),
    options,
  );
};

export default useMemberPostsQuery;
