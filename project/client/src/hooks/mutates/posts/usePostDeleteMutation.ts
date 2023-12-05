import { deletePost } from "apis/posts";
import { useMutation } from "react-query";

const usePostDeleteMutation = () => {
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

export default usePostDeleteMutation;
