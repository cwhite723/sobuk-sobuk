import { postPlan } from "apis/plans";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const usePlanSubmitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      bookId,
      data,
      accessToken,
    }: {
      bookId: number;
      data: PlanData;
      accessToken: string | null;
    }) => postPlan({ bookId, data, accessToken }),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(queryKeys.PLANS_ALL);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default usePlanSubmitMutation;
