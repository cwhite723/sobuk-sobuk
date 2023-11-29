import { postPost } from "apis/posts";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const usePostSubmitMutation = () => {
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
      onSuccess: () => {
        // get post
        // queryClient.invalidateQueries(queryKeys.PLANS_ALL);
        console.log("포스트 등록 성공");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default usePostSubmitMutation;
