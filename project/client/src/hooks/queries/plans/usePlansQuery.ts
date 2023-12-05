import { getPlans } from "apis/plans";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const usePlansQuery = <TData = PlansResponse>(
  status: PlanStatusForReq,
  accessToken: string | null,
  options?: UseQueryOptions<PlansResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.PLANS_BY_STATUS(status),
    () => getPlans({ status, accessToken }),
    options,
  );
};

export default usePlansQuery;
