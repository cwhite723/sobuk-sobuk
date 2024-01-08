import {
  deleteMember,
  patchMember,
  patchMemberFollow,
  postUserNameCheck,
  postLogIn,
  postLogOut,
  postNicknameCheck,
  postSignUp,
} from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import useMemberStore from "store/store";
import { getStoredMember } from "utils/get";

// 로그인 mutation
export const useLogIn = () => {
  const queryClient = useQueryClient();
  const { setToken } = useMemberStore();

  return useMutation((data: MemberLogIn) => postLogIn(data), {
    onSuccess: (data) => {
      // 로그인 성공 시 받아온 토큰을 zustand(세션)에 저장
      setToken(data.headers.authorization);
      queryClient.invalidateQueries(
        queryKeys.MEMBER_MY_PAGE_BY_TOKEN(data.headers.authorization),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// 로그아웃 mutation
export const useLogOut = () => {
  const { clearAll } = useMemberStore();

  return useMutation((token: string | null) => postLogOut(token), {
    onSuccess: () => {
      clearAll();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// 회원탈퇴 mutation
export const useMemberDelete = () => {
  return useMutation((token: string | null) => deleteMember(token), {
    onError: (error) => {
      console.log(error);
    },
  });
};

// 팔로우 mutation
export const useMemberFollow = () => {
  return useMutation(
    ({
      memberId,
      accessToken,
    }: {
      memberId: number;
      accessToken: string | null;
    }) => patchMemberFollow({ memberId, accessToken }),
    {
      onSuccess: () => {
        console.log("팔로우");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 회원 정보 수정 mutation
export const useMemberPatch = () => {
  const prevData = getStoredMember();

  const queryClient = useQueryClient();

  return useMutation(
    ({ data, token }: { data: MemberPatchData; token: string | null }) =>
      patchMember({ data, accessToken: token }),
    {
      onSuccess: (data, variables) => {
        // 수정 성공 시 요청 데이터로 redux(세션)에 저장
        if (prevData) {
          console.log("수정완료");
          return queryClient.invalidateQueries(
            queryKeys.MEMBER_MY_PAGE_BY_TOKEN(variables.token),
            { refetchInactive: true },
          );
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

// 닉네임 중복확인 mutation
export const useNicknameCheck = () => {
  return useMutation((data: { nickname: string }) => postNicknameCheck(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};

// 아이디 중복확인 mutation
export const useUserNameCheck = () => {
  return useMutation((data: { userName: string }) => postUserNameCheck(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};

// 회원가입 mutation
export const useSignUp = () => {
  return useMutation((data: MemberData) => postSignUp(data), {
    onError: (error) => {
      console.log(error);
    },
  });
};
