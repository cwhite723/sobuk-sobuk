import {
  getMember,
  getMemberPlans,
  getMemberPosts,
  getMyPage,
  getMyPlans,
  getMyPosts,
} from "apis/members";
import { queryKeys } from "constants/queryKeys";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

// 내정보 조회
export const useMyPageQuery = <TData = MemberResponse>(
  token: string | null,
  options?: UseQueryOptions<MemberResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_PAGE_BY_TOKEN(token),
    () => getMyPage(token),
    options,
  );
};

// 내정보 플랜 조회
export const useMyPlansQuery = <TData = MemberPlansResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  options?: UseQueryOptions<MemberPlansResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_PLANS(params, token),
    () => getMyPlans({ params, accessToken: token }),
    options,
  );
};

// 내정보 포스트 조회
export const useMyPostsQuery = <TData = MemberPostsResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  options?: UseQueryOptions<MemberPostsResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_MY_POSTS(params, token),
    () => getMyPosts({ params, accessToken: token }),
    options,
  );
};

// 타회원 정보 조회
export const useMemberInfoQuery = <TData = OtherMemberResponse>(
  memberId: number | null,
  token: string | null,
  options?: UseQueryOptions<OtherMemberResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_INFO_BY_MEMBER_ID(memberId, token),
    () => getMember({ memberId, accessToken: token }),
    options,
  );
};

// 타회원 플랜 조회
export const useMemberPlansQuery = <TData = MemberPlansResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  memberId: number | null,
  options?: UseQueryOptions<MemberPlansResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_PLANS_BY_MEMBER_ID(params, memberId, token),
    () => getMemberPlans({ params, memberId, accessToken: token }),
    options,
  );
};

// 타회원 포스트 조회
export const useMemberPostsQuery = <TData = MemberPostsResponse>(
  params: MemberPostsAndBooksParams,
  token: string | null,
  memberId: number | null,
  options?: UseQueryOptions<MemberPostsResponse, Error, TData>,
): UseQueryResult<TData, Error> => {
  return useQuery(
    queryKeys.MEMBER_POSTS_BY_MEMBER_ID(params, memberId, token),
    () => getMemberPosts({ params, memberId, accessToken: token }),
    options,
  );
};
