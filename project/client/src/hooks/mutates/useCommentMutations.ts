import { deleteComment, patchComment, postComment } from "apis/comments";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

// 코멘트 등록 mutation
export const useCommentSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      postId,
      data,
      accessToken,
    }: {
      postId: number;
      data: CommentData;
      accessToken: string | null;
    }) => postComment({ postId, data, accessToken }),
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

// 코멘트 삭제 mutation
export const useCommentDelete = () => {
  return useMutation(
    ({
      commentId,
      accessToken,
    }: {
      commentId: number;
      accessToken: string | null;
    }) => deleteComment({ commentId, accessToken }),
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 코멘트 수정 mutation
export const useCommentEdit = () => {
  return useMutation(
    ({
      commentId,
      data,
      accessToken,
    }: {
      commentId: number;
      data: CommentData;
      accessToken: string | null;
    }) => patchComment({ commentId, data, accessToken }),
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
