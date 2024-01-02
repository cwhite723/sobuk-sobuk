import { deletePost, patchPost, postLikePost, postPost } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

// 포스트 등록 mutation
export const usePostSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      planId,
      data,
      accessToken,
    }: {
      planId: number;
      data: PostData;
      accessToken: string | null;
    }) => postPost({ planId, data, accessToken }),
    {
      onSuccess: (data, variables) => {
        return queryClient.invalidateQueries(
          queryKeys.POST_BY_POST_ID(data.data, variables.accessToken),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 포스트 삭제 mutation
export const usePostDelete = () => {
  return useMutation(
    ({
      postId,
      accessToken,
    }: {
      postId: number | null;
      accessToken: string | null;
    }) => deletePost({ postId, accessToken }),
    {
      onSuccess: () => {
        console.log("삭제 성공");
        // post정보 업데이트
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 포스트 수정 mutation
export const usePostEdit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      postId,
      data,
      accessToken,
    }: {
      postId: number;
      data: PostData;
      accessToken: string | null;
    }) => patchPost({ postId, data, accessToken }),
    {
      onSuccess: (data, variables) => {
        return queryClient.invalidateQueries(
          queryKeys.POST_BY_POST_ID(variables.postId, variables.accessToken),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 포스트 좋아요 mutation
export const usePostLike = () => {
  return useMutation(
    ({
      postId,
      accessToken,
    }: {
      postId: number | null;
      accessToken: string | null;
    }) => postLikePost({ postId, accessToken }),
    {
      onSuccess: () => {
        console.log("추천 성공");
        // 낙관적 업데이트 적용 예정
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
