import Api from "./api";

/**
 * 회원가입
 * @param userName
 * @param password
 * @param nickname
 * @param email
 * @param introduction
 */

export const postSignUp = async (
  userName: string,
  password: string,
  nickname: string,
  email: string,
  introduction: string,
) => {
  return Api.post("/sign-up", {
    userName,
    password,
    nickname,
    email,
    introduction,
  });
};

/**
 * 로그인
 * @param userName
 * @param password
 */

export const postLogIn = async (userName: string, password: string) => {
  return Api.post("/log-in", { userName, password });
};

/**
 * 회원탈퇴
 * @param memberId
 */

export const deleteMember = async (memberId: number) => {
  return Api.delete(`/members/${memberId}`);
};

// data 수정필요

export const patchMember = async (memberId: number, data: string) => {
  return Api.patch(`/members/${memberId}`, data);
};

/**
 * 회원조회
 * @param memberId
 * @returns 회원정보
 */

export const getMember = async (memberId: number) => {
  const response = await Api.get(`/members/${memberId}`).then(
    (response) => response.data,
  );
  return response.data;
};

// 팔로우 관련 함수 추가 필요
