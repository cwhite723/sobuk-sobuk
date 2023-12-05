import { postSignUp } from "apis/members";
import { useMutation } from "react-query";

const useSignUpMutation = () => {
  return useMutation((data: MemberData) => postSignUp(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useSignUpMutation;
