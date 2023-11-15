import Api from "./api";

/**
 * 회원가입 - 완료(url수정)
 * @param data
 * @returns
 */

export const postSignUp = async (data: MemberInfo) => {
  try {
    return Api.post("members/sign-up", data);
  } catch (error) {
    console.error("Error in Post Sign-up:", error);
    throw new Error("Failed to SignUp");
  }
};

/**
 * 로그인 - 완료(url수정)
 * @param data
 * @returns token - header: Authorization, Refresh
 */

export const postLogIn = async (data: MemberLogIn) => {
  try {
    return Api.post("user/log-in", data);
  } catch (error) {
    console.error("Error in Post Log-in:", error);
    throw new Error("Failed to LogIn");
  }
};

/**
 * 회원탈퇴
 * @param memberId
 */

export const deleteMember = async (memberId: number) => {
  try {
    return Api.delete(`/members/${memberId}`);
  } catch (error) {
    console.error("Error in Delete Member:", error);
    throw new Error("Failed to Drop Out of Membership");
  }
};

/**
 * 회원정보 수정
 * @param memberId
 * @param data
 * @returns
 */
export const patchMember = async (patchMemberVariables: MemberPatch) => {
  try {
    return Api.patch(
      `/members/${patchMemberVariables.memberId}`,
      patchMemberVariables.data,
    );
  } catch (error) {
    console.error("Error in Patch Member:", error);
    throw new Error("Failed to Modify Member Info");
  }
};

/**
 * 회원조회
 * @param memberId
 * @returns 회원정보
 */

export const getMember = async (memberId: number) => {
  try {
    const response = await Api.get(`/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error("Error in Get Member:", error);
    throw new Error("Failed to Check Member Info");
  }
};

/**
 * 내정보
 * @returns 로그인한 유저 회원정보
 */
export const getMyPage = async (accessToken: string | null) => {
  try {
    if (accessToken) {
      const response = await Api.get(`/members/my-page`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } else {
      console.log("Access token is missing");
    }
  } catch (error) {
    console.error("Error in Get MyPage:", error);
    throw new Error("Failed to Check My Info");
  }
};

// 팔로우 관련 함수 추가 필요
