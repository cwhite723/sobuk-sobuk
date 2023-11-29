import { patchMemberFollow } from "apis/members";
import { useMutation } from "react-query";

const useMemberFollowMutation = () => {
  return useMutation(
    ({
      memberId,
      accessToken,
    }: {
      memberId: number;
      accessToken: string | null;
    }) => patchMemberFollow({ memberId, accessToken }),
    {
      onSuccess: () => {
        console.log("팔로우");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useMemberFollowMutation;
