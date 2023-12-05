import { postNicknameCheck } from "apis/members";
import { useMutation } from "react-query";

const useNicknameCheckMutation = () => {
  return useMutation((data: { nickname: string }) => postNicknameCheck(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useNicknameCheckMutation;
