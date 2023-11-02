import Api from "./api";

// 댓글 작성
// 데이터 형식 필요
export const postComment = async (data: string) => {
  return Api.post("/comments", {
    data,
  });
};

// 댓글 수정
// 데이터 형식 필요
export const patchComment = async (commentId: number, data: string) => {
  return Api.patch(`/comments/${commentId}`, {
    data,
  });
};

/**
 * 댓글 삭제
 * @param commentId
 * @returns
 */
export const deleteComment = async (commentId: number) => {
  return Api.delete(`/comments/${commentId}`);
};
