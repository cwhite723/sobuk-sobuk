import Api from "./api";

/**
 * 댓글 작성 토큰O - 완료
 * @param data
 * @returns body{ success: boolean, data: commentID }
 */
export const postComment = async (data: CommentInfo) => {
  try {
    return Api.post(`/comments/${data.postId}`, {
      content: data.content,
    });
  } catch (error) {
    console.error("Error in Post Comment:", error);
    throw new Error("Failed to Write Comment");
  }
};

/**
 * 댓글 수정 - 완료
 * @param data
 * @returns body{ success: boolean, data: commentId }
 */
export const patchComment = async (data: CommentInfo) => {
  try {
    return Api.patch(`/comments/${data.commentId}`, {
      content: data.content,
    });
  } catch (error) {
    console.error("Error in Patch Comment:", error);
    throw new Error("Failed to Modify Comment");
  }
};

/**
 * 댓글 삭제 - 완료
 * @param commentId
 * @returns body{ success: boolean }
 */
export const deleteComment = async (commentId: number) => {
  try {
    return Api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error in Delete Comment:", error);
    throw new Error("Failed to Delete Comment");
  }
};
