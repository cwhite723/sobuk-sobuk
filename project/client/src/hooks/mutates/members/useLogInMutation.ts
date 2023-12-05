import { postLogIn } from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setToken } from "store/auth";

const useLogInMutation = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  return useMutation((data: MemberLogIn) => postLogIn(data), {
    onSuccess: (data) => {
      // 로그인 성공 시 받아온 토큰을 redux(세션)에 저장
      dispatch(setToken(data.headers.authorization));
      queryClient.invalidateQueries(
        queryKeys.MEMBER_MY_PAGE_BY_TOKEN(data.headers.authorization),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogInMutation;
