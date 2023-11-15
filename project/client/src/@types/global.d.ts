export {};

declare global {
  interface TabMenuType {
    label: string;
    value: string;
  }

  type DialogType = "read" | "progress" | "submit";

  type BookState =
    | "READING"
    | "COMPLETED"
    | "NOT_CREATED_POST"
    | "NOT_STARTED"
    | "OVERDUE";

  // api 데이터 타입 - members
  interface MemberInfo {
    memberId?: number;
    userName: string;
    password: string;
    nickname: string;
    email: string;
    introduction: string;
    img?: string;
  }

  interface MemberLogIn {
    userName: string;
    password: string;
  }

  interface MemberPatch {
    memberId: number;
    data: MemberInfo;
  }

  // api 데이터 타입 - books
  interface BookInfo {
    bookId?: number;
    title: string;
    publisher: string;
    author: string;
    publicationDate: string;
    createdAt?: string;
    isUserInput: boolean;
    src?: string;
  }

  interface BookInfoSimple {
    bookId: number;
    title: string;
    author: string;
  }

  interface BookPatch {
    bookId: number;
    data: BookInfo;
  }

  interface BookParams {
    page: number;
    size: number;
    sortType?: string;
    title?: string;
    author?: string;
  }

  // api 데이터 타입 - plans
  interface PlanInfo {
    bookId: number;
    planId?: number;
    startDate: string;
    endDate: string;
    totalPage: number;
    readPageNumber?: number;
    todayPage?: number;
    status?: string;
  }

  interface PlanPatch {
    planId: number | null;
    accessToken: string | null;
    data: PlanInfo;
  }

  // api 데이터 타입 - posts
  interface PostInfo {
    bookId: number;
    postId?: number;
    title: string;
    content: string;
  }

  interface PostParams {
    page: number;
    size: number;
    sortType: string;
  }

  // api 데이터 타입 - comments
  interface CommentInfo {
    postId?: number;
    commentId?: number;
    content: string;
  }

  // response type
  interface PostResponse {
    memberId: number;
    userName: string;
    nickname: string;
    bookId?: number;
    bookTitle: string;
    bookAuthor: string;
    startDate?: string;
    endDate?: string;
    postId?: number;
    postTitle: string;
    content: string;
    countComments: number;
    countLikes: number;
    createdAt: string;
    updatedat: string;
    myPost?: boolean;
    myLike?: boolean;
  }

  interface CommentResponse {
    commentId: number;
    memberId: number;
    nickname: string;
    userName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    myComment: boolean;
  }

  interface Response {
    postResponse: PostResponse;
    commentResponses: CommentResponse;
  }
}
