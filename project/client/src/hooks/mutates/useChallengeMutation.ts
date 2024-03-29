import {
  deleteChallenge,
  participateChallenge,
  patchChallenge,
  postChallenge,
} from "apis/challenges";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

// 챌린지 생성 mutation
export const useChallengeCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      bookId,
      data,
      accessToken,
    }: {
      bookId: number;
      data: ChallengeData;
      accessToken: string | null;
    }) => postChallenge({ bookId, data, accessToken }),
    {
      onSuccess: (data, variables) => {
        return queryClient.invalidateQueries(
          queryKeys.CHALLENGE_BY_CHALLENGE_ID(data.data, variables.accessToken),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 챌린지 삭제 mutation
export const useChallengeDelete = () => {
  return useMutation(
    ({
      challengeId,
      accessToken,
    }: {
      challengeId: number | null;
      accessToken: string | null;
    }) => deleteChallenge({ challengeId, accessToken }),
    {
      onSuccess: () => {
        console.log("삭제 성공");
        // challenge정보 업데이트
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 챌린지 수정 mutation
export const useChallengeEdit = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      challengeId,
      data,
      accessToken,
    }: {
      challengeId: number;
      data: ChallengeData;
      accessToken: string | null;
    }) => patchChallenge({ challengeId, data, accessToken }),
    {
      onSuccess: (data, variables) => {
        return queryClient.invalidateQueries(
          queryKeys.CHALLENGE_BY_CHALLENGE_ID(
            variables.challengeId,
            variables.accessToken,
          ),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 챌린지 참여 mutation
export const useChallengeParticipate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      challengeId,
      accessToken,
    }: {
      challengeId: number;
      accessToken: string | null;
    }) => participateChallenge({ challengeId, accessToken }),
    {
      onSuccess: (data, variables) => {
        return queryClient.invalidateQueries(
          queryKeys.CHALLENGE_BY_CHALLENGE_ID(
            variables.challengeId,
            variables.accessToken,
          ),
        );
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
