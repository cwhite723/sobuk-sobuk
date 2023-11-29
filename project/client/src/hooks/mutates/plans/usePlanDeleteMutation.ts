import { deletePlan } from "apis/plans";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const usePlanDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ planId, accessToken }: { planId: number; accessToken: string | null }) =>
      deletePlan({ planId, accessToken }),
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

export default usePlanDeleteMutation;
