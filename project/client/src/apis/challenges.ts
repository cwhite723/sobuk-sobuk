import Api from "./api";

/**
 * 챌린지 생성
 * @param { bookId:number, data: ChallengeData, accessToken: string | null}
 * @returns { data: challengeId }
 */
export const postChallenge = async ({
  bookId,
  data,
  accessToken,
}: {
  bookId: number;
  data: ChallengeData;
  accessToken: string | null;
}): Promise<ChallengeIdResponse> => {
  if (accessToken) {
    try {
      const response = await Api.post(`/challenges/${bookId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Post Challenge:", error);
      throw new Error("Failed to Create Challenge");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 챌린지 수정
 * @param param0
 * @returns
 */
export const patchChallenge = async ({
  challengeId,
  data,
  accessToken,
}: {
  challengeId: number;
  data: ChallengeData;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      const response = await Api.patch(`/challenges/${challengeId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Patch Challenge:", error);
      throw new Error("Failed to Modify Challenge");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 챌린지 삭제
 * @param param0
 * @returns
 */
export const deleteChallenge = async ({
  challengeId,
  accessToken,
}: {
  challengeId: number | null;
  accessToken: string | null;
}) => {
  if (accessToken && challengeId) {
    try {
      return await Api.delete(`/challenges/${challengeId}`, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Delete Challenge:", error);
      throw new Error("Failed to Delete Challenge");
    }
  }
  throw new Error("Missing Aceess Token or Challenge Id");
};

/**
 * 전체 챌린지 조회
 * @returns
 */
export const getAllChallenges = async (
  params: ChallengeParams,
): Promise<ChallengesResponse> => {
  try {
    const response = await Api.get("/challenges", { params });
    return response.data;
  } catch (error) {
    console.error("Error in Get All Challenges:", error);
    throw new Error("Failed to Check All Challenges");
  }
};

/**
 * 챌린지 단건 조회
 * @param { challengeId: number, accessToken: string | null}
 * @returns { success: boolean, data: ChallengeResponse}
 */
export const getChallenge = async ({
  challengeId,
  accessToken,
}: {
  challengeId: number | null;
  accessToken: string | null;
}): Promise<ChallengeResponse> => {
  if (accessToken && challengeId) {
    try {
      const response = await Api.get(`/challenges/${challengeId}`, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Challenge:", error);
      throw new Error("Failed to Check Challenge Info");
    }
  }
  throw new Error("Missing Access Token or Challenge Id");
};

/**
 * 참여중인 챌린지 조회
 * @param { params: Challengeparams, accessToken: string | null }
 * @returns
 */
export const getMyChallenges = async ({
  params,
  accessToken,
}: {
  params: ChallengeParams;
  accessToken: string | null;
}): Promise<ChallengesResponse> => {
  if (accessToken) {
    try {
      const response = await Api.get("/challenges/my-challenge", {
        params,
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get My Challenges:", error);
      throw new Error("Failed to Check My Challenges Info");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 챌린지 참여
 * @param { challengeId: number | null, accessToken: string | null }
 * @returns
 */
export const participateChallenge = async ({
  challengeId,
  accessToken,
}: {
  challengeId: number | null;
  accessToken: string | null;
}) => {
  if (accessToken && challengeId) {
    try {
      return await Api.post(`/challenges/${challengeId}/participate`, null, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in participate Challenge:", error);
      throw new Error("Failed to participate Challenge");
    }
  }
  throw new Error("Missing Aceess Token or Challenge Id");
};
