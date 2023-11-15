import Api from "./api";

/**
 * 독서 기록(포스트) 작성 토큰O - 완료
 * @param data
 * @returns body{ success: boolean, data: postId }
 */
export const postPost = async (data: PostInfo) => {
  try {
    return Api.post(`/posts/${data.bookId}`, {
      title: data.title,
      content: data.content,
    });
  } catch (error) {
    console.error("Error in Post Post:", error);
    throw new Error("Failed to Write Post");
  }
};

/**
 * 독서 기록(포스트) 수정 토큰O - 완료
 * @param data
 * @returns body{ success: boolean, data: postId }
 */
export const patchPost = async (data: PostInfo) => {
  try {
    return Api.patch(`/posts/${data.postId}`, {
      title: data.title,
      content: data.content,
    });
  } catch (error) {
    console.error("Error in Patch Post:", error);
    throw new Error("Failed to Modify Post");
  }
};

/**
 * 독서 기록(포스트) 삭제 - 완료
 * @param postId
 * @returns body{ success: boolean }
 */
export const deletePost = async (postId: number) => {
  try {
    return Api.delete(`/posts/${postId}`);
  } catch (error) {
    console.error("Error in Delete Post:", error);
    throw new Error("Failed to Delete Post");
  }
};

/**
 * 개별 독서 기록(포스트) 조회 토큰O - 완료
 * @param postId
 * @returns body{ success: boolean, data: { postResponse, commentResponse } }
 */
export const getPost = async (postId: number): Promise<Response> => {
  try {
    const response = await Api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error in Get Post:", error);
    throw new Error("Failed to Check Post Info");
  }
};

/**
 * 전체 독서 기록(포스트) 조회 - 완료
 * @param params
 * @returns body{ success: boolean, data: { content[] } }
 */
export const getAllPosts = async (
  params: PostParams,
): Promise<PostResponse[]> => {
  try {
    const response = await Api.get("/posts", { params: { params } });
    return response.data;
  } catch (error) {
    console.error("Error in Get All Posts:", error);
    throw new Error("Failed to Check All Posts");
  }
};

/**
 * 독서 기록(포스트) 추천 토글 = 완료
 * @param postId
 * @returns body{ success: boolean }
 */
export const postLikePost = async (postId: number) => {
  try {
    return Api.post(`/posts/${postId}/like`);
  } catch (error) {
    console.error("Error in Post Like Post:", error);
    throw new Error("Failed to Post Like");
  }
};
