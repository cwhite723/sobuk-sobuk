import { patchMember } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const useMemberPatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, token }: { data: MemberPatchData; token: string | null }) =>
      patchMember({ data, accessToken: token }),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          queryKeys.MEMBER_MY_PAGE_BY_TOKEN(variables.token),
          variables.data,
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useMemberPatchMutation;
