import { getMyPosts } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMyPostsQuery = <TData = MemberPostsResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  options?: UseQueryOptions<MemberPostsResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_POSTS(params, token),
    () => getMyPosts({ params, accessToken: token }),
    options,
  );
};

export default useMyPostsQuery;
