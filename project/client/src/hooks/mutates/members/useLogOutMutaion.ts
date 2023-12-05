import { postLogOut } from "apis/members";
import { useMutation } from "react-query";

const useLogOutMutation = () => {
  return useMutation((token: string | null) => postLogOut(token), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogOutMutation;
