import Api from "./api";

/**
 * 독서 기록(포스트) 작성 - 완료
 * @param { planId: number, data: PostData, accessToken: string | null }
 * @returns { data: postId }
 */
export const postPost = async ({
  planId,
  data,
  accessToken,
}: {
  planId: number;
  data: PostData;
  accessToken: string | null;
}): Promise<PostIdResponse> => {
  if (accessToken) {
    try {
      const response = await Api.post(`/posts/${planId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Post Post:", error);
      throw new Error("Failed to Write Post");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 독서 기록(포스트) 수정 - 완료
 * @param { postId: number, data: PostData }
 * @returns { data: postId }
 */
export const patchPost = async ({
  postId,
  data,
  accessToken,
}: {
  postId: number;
  data: PostData;
  accessToken: string | null;
}): Promise<PostIdResponse> => {
  if (accessToken) {
    try {
      const response = await Api.patch(`/posts/${postId}`, data, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Patch Post:", error);
      throw new Error("Failed to Modify Post");
    }
  }
  throw new Error("Missing Access Token");
};

/**
 * 독서 기록(포스트) 삭제 - 완료
 * @param postId
 * @returns
 */
export const deletePost = async ({
  postId,
  accessToken,
}: {
  postId: number | null;
  accessToken: string | null;
}) => {
  if (accessToken) {
    try {
      return await Api.delete(`/posts/${postId}`, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Delete Post:", error);
      throw new Error("Failed to Delete Post");
    }
  }
  throw new Error("Missing Aceess Token or Post Id");
};

/**
 * 개별 독서 기록(포스트) 조회 - 완료
 * @param { postId: number, accessToken: string | null }
 * @returns { PostResponse }
 */
export const getPost = async ({
  postId,
  accessToken,
}: {
  postId: number | null;
  accessToken: string | null;
}): Promise<PostResponse> => {
  if (accessToken && postId) {
    try {
      const response = await Api.get(`/posts/${postId}`, {
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get Post:", error);
      throw new Error("Failed to Check Post Info");
    }
  }
  throw new Error("Missing Aceess Token or Post Id");
};

/**
 * 전체 독서 기록(포스트) 조회 - 완료
 * @param params : PostParams
 * @returns { PostsResponse }
 */
export const getAllPosts = async ({
  params,
  accessToken,
}: {
  params: PostParams;
  accessToken: string | null;
}): Promise<PostsResponse> => {
  if (accessToken) {
    try {
      const response = await Api.get("/posts", {
        params,
        headers: { Authorization: `${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in Get All Posts:", error);
      throw new Error("Failed to Check All Posts");
    }
  }
  throw new Error("Missing Aceess Token");
};

/**
 * 독서 기록(포스트) 추천 토글 - 완료
 * @param postId
 * @returns { success: boolean }
 */
export const postLikePost = async ({
  postId,
  accessToken,
}: {
  postId: number | null;
  accessToken: string | null;
}) => {
  if (accessToken && postId) {
    try {
      return await Api.post(`/posts/${postId}/like`, null, {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error) {
      console.error("Error in Post Like Post:", error);
      throw new Error("Failed to Post Like");
    }
  }
  throw new Error("Missing Aceess Token or Post Id");
};
