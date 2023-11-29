import { patchPost } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const usePostEditMutation = () => {
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
      onSuccess: () => {
        // get post
        // queryClient.invalidateQueries(queryKeys.PLANS_ALL);
        console.log("포스트 수정 성공");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default usePostEditMutation;
