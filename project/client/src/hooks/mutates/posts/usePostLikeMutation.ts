import { postLikePost } from "apis/posts";
import { useMutation } from "react-query";

const usePostLikeMutation = () => {
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

export default usePostLikeMutation;
