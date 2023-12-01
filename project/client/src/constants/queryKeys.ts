import { QueryKey } from "react-query";

export const queryKeys = {
  // MEMBER_QUERY_KEYS
  MEMBER_MY_PAGE_BY_TOKEN: (token: string | null) =>
    ["myPage", token] as QueryKey,
  MEMBER_MY_PLANS: (params: MemberPostsAndBooksParams, token: string | null) =>
    ["getMyPlans", { params, token }] as QueryKey,
  MEMBER_MY_POSTS: (params: MemberPostsAndBooksParams, token: string | null) =>
    ["getMyPosts", { params, token }] as QueryKey,

  MEMBER_INFO_BY_MEMBER_ID: (memberId: number | null, token: string | null) =>
    ["getMember", { memberId, token }] as QueryKey,

  MEMBER_PLANS_BY_MEMBER_ID: (
    params: MemberPostsAndBooksParams,
    memberId: number | null,
    token: string | null,
  ) => ["getMemberPlans", { params, memberId, token }] as QueryKey,
  MEMBER_POSTS_BY_MEMBER_ID: (
    params: MemberPostsAndBooksParams,
    memberId: number | null,
    token: string | null,
  ) => ["getMemberPosts", { params, memberId, token }] as QueryKey,

  // BOOK_QUERY_KEYS
  BOOK_BY_BOOK_ID: (bookId: number | null) => ["getBook", bookId] as QueryKey,
  BOOKS_BY_BOOK_PARAMS: (bookParams: BookParams) =>
    ["getBooks", bookParams] as QueryKey,

  // KAKAO_BOOK_QUERY_KEYS
  BOOKS_KAKAO_BY_PARAMS: (params: KakaoBookParams) =>
    ["getKakaoBooks", params] as QueryKey,

  // PLAN_QUERY_KEYS
  PLANS_ALL: ["getPlans"] as QueryKey,
  PLANS_BY_STATUS: (status: string) => ["getPlans", status] as QueryKey,

  // POST_QUERY_KEYS
  POST_BY_POST_ID: (postId: number | null, token: string | null) =>
    ["getPost", { postId, token }] as QueryKey,
  POSTS_BY_POST_PARAMS: (params: PostParams, token: string | null) =>
    ["getAllPosts", { params, token }] as QueryKey,
};
