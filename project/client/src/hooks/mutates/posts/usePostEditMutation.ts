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

export default usePostEditMutation;
