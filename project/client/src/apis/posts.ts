import Api from "./api";

// 포스트 작성
// 데이터 형식 필요
export const postPost = async (data: string) => {
  return Api.post("/posts", {
    data,
  });
};

// 포스트 수정
// 데이터 형식 필요
export const patchPost = async (postId: number, data: string) => {
  return Api.patch(`/posts/${postId}`, {
    data,
  });
};

/**
 * 포스트 삭제
 * @param postId
 * @returns
 */
export const deletePost = async (postId: number) => {
  return Api.delete(`/posts/${postId}`);
};

// 독서기록 조회 미완성
