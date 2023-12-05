import { postIdCheck } from "apis/members";
import { useMutation } from "react-query";

const useIdCheckMutation = () => {
  return useMutation((data: { userName: string }) => postIdCheck(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useIdCheckMutation;
