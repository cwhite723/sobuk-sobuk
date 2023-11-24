import Api from "./api";

/**
 * 독서 정보 등록 - 완료
 * @param { bookId: number, data: PlanData, accessToken: string | null }
 * @returns
 */
export const postPlan = async ({
  bookId,
  data,
  accessToken,
}: {
  bookId: number;
  data: PlanData;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.post(`/plans/${bookId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Post Plan:", error);
      throw new Error("Failed to Register Plan");
    }
  }
};

/**
 * 독서 정보 수정 - 완료
 * @param { planId:number, data:PlanData, accessToken: string | null }
 * @returns
 */
export const patchPlan = async ({
  planId,
  data,
  accessToken,
}: {
  planId: number;
  data: PlanData;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.patch(`/plans/${planId}`, data, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error in Patch Plan:", error);
      throw new Error("Failed to Modify Plan");
    }
  }
};

/**
 * 독서 정보 삭제 - 완료
 * @param planId
 * @returns { success: boolean }
 */
export const deletePlan = async ({
  planId,
  accessToken,
}: {
  planId: number;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.delete(`/plans/${planId}`, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Delete Plan:", error);
      throw new Error("Failed to Delete Plan");
    }
  }
};

/**
 * 독서 정보 조회 - 완료
 * @param status
 * @param accessToken
 * @returns { success: boolean, data: PlanInfo[] }
 */
export const getPlans = async (
  status: string,
  accessToken: string | null,
): Promise<PlansResponse | undefined> => {
  if (accessToken) {
    try {
      const response = await Api.get("/plans", {
        params: { status },
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Plans:", error);
      throw new Error("Failed to Check Plans Info");
    }
  }
};
