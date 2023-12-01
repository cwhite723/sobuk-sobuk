import { getPost } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const usePostQuery = <TData = PostResponse>(
  postId: number | null,
  accessToken: string | null,
  options?: UseQueryOptions<PostResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.POST_BY_POST_ID(postId, accessToken),
    () => getPost({ postId, accessToken }),
    options,
  );
};

export default usePostQuery;
