import Api from "./api";

/**
 * 독서 정보 등록 토큰O - 완료
 * @param data
 * @returns body{ success: boolean }
 */

export const postPlan = async ({
  data,
  accessToken,
}: {
  data: PlanInfo;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return Api.post(
        `/plans/${data.bookId}`,
        {
          startDate: data.startDate,
          endDate: data.endDate,
          totalPage: data.totalPage,
          readPageNumber: data.readPageNumber,
        },
        {
          headers: { Authorization: `${accessToken}` },
        },
      );
    } catch (error) {
      console.error("Error in Post Plan:", error);
      throw new Error("Failed to Register Plan");
    }
  }
};

/**
 * 독서 정보 수정 토큰O - 완료
 * @param patchPlanVariables
 * @returns body{ success: boolean }
 */

export const patchPlan = async (patchPlanVariables: PlanPatch) => {
  if (patchPlanVariables.accessToken && patchPlanVariables.planId) {
    try {
      return Api.patch(
        `/plans/${patchPlanVariables.planId}`,
        {
          startDate: patchPlanVariables.data.startDate,
          endDate: patchPlanVariables.data.endDate,
          totalPage: patchPlanVariables.data.totalPage,
          readPageNumber: patchPlanVariables.data.readPageNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${patchPlanVariables.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error("Error in Patch Plan:", error);
      throw new Error("Failed to Modify Plan");
    }
  }
};

/**
 * 독서 정보 삭제 - 완료
 * @param planId
 * @returns body{ success: boolean }
 */
export const deletePlan = async (planId: number) => {
  try {
    return Api.delete(`/plans/${planId}`);
  } catch (error) {
    console.error("Error in Delete Plan:", error);
    throw new Error("Failed to Delete Plan");
  }
};

/**
 * 독서 정보 조회 토큰O - 완료
 * @param status
 * @param accessToken
 * @returns body{ success: boolean, data: PlanInfo[] }
 */
export const getPlans = async (
  status: string,
  accessToken: string | null,
): Promise<PlanInfo[] | undefined> => {
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
