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

export default usePostSubmitMutation;
