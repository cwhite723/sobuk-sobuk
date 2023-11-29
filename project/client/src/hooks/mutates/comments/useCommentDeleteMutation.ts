import { deleteComment } from "apis/comments";
import { useMutation } from "react-query";

const useCommentDeleteMutation = () => {
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

export default useCommentDeleteMutation;
