import { patchMember } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setMember } from "store/auth";
import { getStoredMember } from "utils/get";

const useMemberPatchMutation = () => {
  const dispatch = useDispatch();

  const prevData = getStoredMember();

  const queryClient = useQueryClient();

  return useMutation(
    ({ data, token }: { data: MemberPatchData; token: string | null }) =>
      patchMember({ data, accessToken: token }),
    {
      onSuccess: (data, variables) => {
        // 수정 성공 시 요청 데이터로 redux(세션)에 저장
        if (prevData) {
          dispatch(
            setMember({
              ...prevData,
              nickname: variables.data.nickname,
              introduction: variables.data.introduction,
            }),
          );
          return queryClient.invalidateQueries(
            queryKeys.MEMBER_MY_PAGE_BY_TOKEN(variables.token),
            { refetchInactive: true },
          );
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useMemberPatchMutation;
