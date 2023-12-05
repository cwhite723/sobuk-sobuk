import { getAllPosts } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const usePostsQuery = <TData = PostsResponse>(
  params: PostParams,
  accessToken: string | null,
  options?: UseQueryOptions<PostsResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.POSTS_BY_POST_PARAMS(params, accessToken),
    () => getAllPosts({ params, accessToken }),
    options,
  );
};

export default usePostsQuery;
