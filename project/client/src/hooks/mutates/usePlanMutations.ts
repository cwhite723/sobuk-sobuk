import { deletePlan, patchPlan, postPlan } from "apis/plans";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

// 플랜 등록 mutation
export const usePlanSubmit = () => {
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

// 플랜 삭제 mutation
export const usePlanDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ planId, accessToken }: { planId: number; accessToken: string | null }) =>
      deletePlan({ planId, accessToken }),
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

// 플랜 수정 mutation
export const usePlanEdit = () => {
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
        return queryClient.invalidateQueries(queryKeys.PLANS_ALL);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
