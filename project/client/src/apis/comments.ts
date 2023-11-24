import Api from "./api";

/**
 * 댓글 작성 - 완료
 * @param param0
 * @returns
 */
export const postComment = async ({
  postId,
  data,
  accessToken,
}: {
  postId: number;
  data: CommentData;
  accessToken: string | null;
}): Promise<CommentIdResponse | undefined> => {
  if (accessToken) {
    try {
      const response = await Api.post(`/comments/${postId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Post Comment:", error);
      throw new Error("Failed to Write Comment");
    }
  }
};

/**
 * 댓글 수정 - 완료
 * @param param0
 * @returns
 */
export const patchComment = async ({
  commentId,
  data,
}: {
  commentId: number;
  data: CommentData;
}): Promise<CommentIdResponse | undefined> => {
  try {
    const response = await Api.patch(`/comments/${commentId}`, {
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error in Patch Comment:", error);
    throw new Error("Failed to Modify Comment");
  }
};

/**
 * 댓글 삭제 - 완료
 * @param commentId
 * @returns { success: boolean }
 */
export const deleteComment = async (commentId: number) => {
  try {
    return await Api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error in Delete Comment:", error);
    throw new Error("Failed to Delete Comment");
  }
};
