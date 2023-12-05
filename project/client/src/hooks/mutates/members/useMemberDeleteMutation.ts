import { deleteMember } from "apis/members";
import { useMutation } from "react-query";

const useMemberDeleteMutation = () => {
  return useMutation((token: string | null) => deleteMember(token), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useMemberDeleteMutation;
