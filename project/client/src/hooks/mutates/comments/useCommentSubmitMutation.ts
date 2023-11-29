import { postComment } from "apis/comments";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const useCommentSubmitMutation = () => {
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
        queryClient.invalidateQueries(
          queryKeys.POSTS_BY_POST_ID(variables.postId, variables.accessToken),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useCommentSubmitMutation;
