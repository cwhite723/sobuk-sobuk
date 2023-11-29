import { getMember } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

const useMemberInfoQuery = <TData = OtherMemberResponse>(
  memberId: number | null,
  token: string | null,
  options?: UseQueryOptions<OtherMemberResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_INFO_BY_MEMBER_ID(memberId, token),
    () => getMember({ memberId, accessToken: token }),
    options,
  );
};

export default useMemberInfoQuery;
