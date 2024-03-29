import {
  getAllChallenges,
  getChallenge,
  getMyChallenges,
} from "apis/challenges";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

// 챌린지 단일 조회
export const useChallengeQuery = <TData = ChallengeResponse>(
  challengeId: number | null,
  accessToken: string | null,
  options?: UseQueryOptions<ChallengeResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.CHALLENGE_BY_CHALLENGE_ID(challengeId, accessToken),
    () => getChallenge({ challengeId, accessToken }),
    options,
  );
};

// 챌린지 전체 조회
export const useChallengesQuery = <TData = ChallengesResponse>(
  params: ChallengeParams,
  options?: UseQueryOptions<ChallengesResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.CHALLENGES_BY_CHALLENGE_PARAMS(params),
    () => getAllChallenges(params),
    options,
  );
};

// 참여중인 챌린지 조회
export const useMyChallengesQuery = <TData = ChallengesResponse>(
  params: ChallengeParams,
  accessToken: string | null,
  options?: UseQueryOptions<ChallengesResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.CHALLENGES_BY_MEMBER(params, accessToken),
    () => getMyChallenges({ params, accessToken }),
    options,
  );
};
