import Api from "./api";

/**
 * 독서 정보 등록
 * @param startDate
 * @param endDate
 * @param readPageNumber
 * @param status
 * @param bookId
 * @returns
 */

export const postPlan = async (
  startDate: string,
  endDate: string,
  readPageNumber: number,
  status: string,
  bookId: number,
) => {
  return Api.post(`/plans/${bookId}`, {
    startDate,
    endDate,
    readPageNumber,
    status,
  });
};

/**
 * 독서 정보 수정
 * @param startDate
 * @param endDate
 * @param readPageNumber
 * @param status
 * @param recordId
 * @returns
 */

export const patchPlan = async (
  startDate: string,
  endDate: string,
  readPageNumber: number,
  status: string,
  recordId: number,
) => {
  return Api.post(`/plans/${recordId}`, {
    startDate,
    endDate,
    readPageNumber,
    status,
  });
};

/**
 * 독서 정보 삭제
 * @param recordId
 * @returns
 */
export const deletePlan = async (recordId: number) => {
  return Api.delete(`/plans/${recordId}`);
};

/**
 * 독서 정보 조회
 * @param status
 * @returns
 */
export const getPlans = async (status: string) => {
  const response = await Api.get("/plans", {
    params: { status },
  }).then((response) => response.data);
  return response.data;
};
