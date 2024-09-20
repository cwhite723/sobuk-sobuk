import { getAllPosts, getPost } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

// 포스트 단일 조회
export const usePostQuery = <TData = PostResponse>(
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

// 포스트 전체 조회
export const usePostsQuery = <TData = PostsResponse>(
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
