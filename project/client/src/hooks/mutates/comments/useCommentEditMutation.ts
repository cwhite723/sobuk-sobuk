import { patchComment } from "apis/comments";
import { useMutation } from "react-query";

const useCommentEditMutation = () => {
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

export default useCommentEditMutation;
