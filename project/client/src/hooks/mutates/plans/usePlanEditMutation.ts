import { patchPlan } from "apis/plans";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const usePlanEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      planId,
      data,
      accessToken,
    }: {
      planId: number;
      data: PlanData;
      accessToken: string | null;
    }) => patchPlan({ planId, data, accessToken }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.PLANS_ALL);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default usePlanEditMutation;
