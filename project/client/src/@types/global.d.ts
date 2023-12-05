export {};

declare global {
  type TabMenuTypeValues =
    | "DATE"
    | "COMMENT"
    | "LIKE"
    | "ALL"
    | "FOLLOWING"
    | "INTRO"
    | "LIB"
    | "POST"
    | "SETTING";

  // type DataFilterType = "DATE" | "COMMENT" | "LIKE" | "ALL" | "FOLLOWING";
  // type UserTabType = "INTRO" | "LIB" | "POST" | "SETTING";

  interface TabMenuType {
    label: string;
    value: TabMenuTypeValues;
  }

  // interface TabMenuType {
  //   label: string;
  //   value: DataFilterType;
  // }

  // interface UserTabMenuType {
  //   label: string;
  //   value: UserTabType;
  // }

  type DialogType = "read" | "progress" | "submit";

  type PlanStatusForReq =
    | "READING"
    | "COMPLETED"
    | "NOT_CREATED_POST"
    | "NOT_STARTED"
    | "OVERDUE";

  type PlanStatusForRes =
    | "reading"
    | "completed"
    | "not_created_post"
    | "not_started"
    | "overdue";

  type BookSortType =
    | "bookmarksCount "
    | "publicationDate"
    | "readingPlansCount";

  // type PostSortType = "DATE" | "COMMENT" | "LIKE";

  interface MutationCallbackType {
    successCallback?: () => void;
    errorCallback?: () => void;
  }

  // ------ Members API 관련 데이터 타입
  interface MemberData {
    userName: string;
    password?: string;
    nickname: string;
    email: string;
    introduction: string;
    image?: string | null;
  }

  interface MemberPatchData {
    password?: string;
    nickname: string;
    introduction: string;
    image?: string | null;
  }

  interface MemberLogIn {
    userName: string;
    password: string;
  }

  interface MemberInfo {
    memberId?: number;
    nickname: string;
    userName: string;
    introduction: string;
    image?: string | null;
    countFollower: number;
    countFollowing: number;
    countBookMark: number;
    countPost: number;
  }

  interface OtherMemberInfo {
    nickname: string;
    userName: string;
    introduction: string;
    image?: string | null;
    countBookMark: number;
    countPost: number;
    following: boolean;
  }

  interface MemberPostsAndBooksParams {
    id: number | null;
    size: number;
  }

  interface MemberPostsInfo {
    postId: number;
    bookTitle: string;
    author: string;
    title: string;
    content: string;
    imageUrl?: string;
    countComment: number;
    countLike: number;
  }

  interface MemberPlansInfo {
    readingPlanId: number;
    title: string;
    author: string;
    totalPage: number;
    todayPage: number;
    imageUrl?: string;
    status: BookStatus;
  }

  // ------ Members API Response 데이터 타입
  interface MemberResponse {
    data: MemberInfo;
  }

  interface OtherMemberResponse {
    data: OtherMemberInfo;
  }

  interface MemberPostsResponse {
    data: {
      data: MemberPostsInfo[];
      pageSize: number;
      // 이 값이 true면 다음 값을 요청
      hasNext: boolean;
    };
  }

  interface MemberPlansResponse {
    data: {
      data: MemberPlansInfo[];
      pageSize: number;
      // 이 값이 true면 다음 값을 요청
      hasNext: boolean;
    };
  }

  // ------ Books API 관련 데이터 타입
  interface BookData {
    title: string;
    author: string;
    publisher: string;
    publicationDate: string;
    isUserInput: boolean;
    imageUrl?: string | null;
  }

  interface BookInfo {
    bookId: number;
    title: string;
    publisher: string;
    author: string;
    publicationDate: string;
    createdAt?: string;
    isUserInput: boolean;
    imageUrl: string | null;
  }

  interface BookInfoSimple {
    bookId: number;
    title: string;
    author: string;
    publisher: string;
    imageUrl: string | null;
    publicationDate: string;
  }

  interface BookParams {
    page: number;
    size: number;
    sortType?: BookSortType;
    title?: string;
    author?: string;
  }

  // ------ Books API Response 데이터 타입
  interface BookIdResponse {
    data: number;
  }

  interface BookResponse {
    data: BookInfo;
  }

  interface BooksResponse {
    data: {
      content: BookInfoSimple[];
      totalPages: number;
      totalElements: number;
    };
  }

  // ------ Plans API 관련 데이터 타입
  interface PlanData {
    startDate: string;
    endDate: string;
    totalPage: number;
    readPageNumber: number;
  }

  interface PlanInfo {
    planId: number;
    title: string;
    author: string;
    bookImage?: string;
    status: PlanStatusForRes;
    startDate: string;
    endDate: string;
    totalPage: number;
    todayPage: number;
    readPage: number;
  }

  // ------ Plans API Response 데이터 타입
  interface PlansResponse {
    data: PlanInfo[];
  }

  // ------ Comments API 관련 데이터 타입
  interface CommentData {
    content: string;
  }

  // ------ Comments API Response 데이터 타입
  interface CommentIdResponse {
    data: number;
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

  // ------ Posts API 관련 데이터 타입
  interface PostData {
    title: string;
    content: string;
    imageUrl?: string;
  }

  interface PostInfo {
    memberId: number;
    userName: string;
    nickname: string;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    startDate: string;
    endDate: string;
    postId: number;
    postTitle: string;
    content: string;
    imageUrl: string | null;
    countComments: number;
    countLikes: number;
    createdAt: string;
    updatedat: string;
    myPost?: boolean;
    myLike?: boolean;
  }

  interface PostParams {
    page: number;
    size: number;
    sortType: TabMenuTypeValues;
  }

  // ------ Posts API Response 데이터 타입
  interface PostIdResponse {
    data: number;
  }

  interface PostResponse {
    // post 개별 조회
    data: {
      postResponse: PostInfo;
      commentResponses: CommentResponse[];
    };
  }

  interface PostsResponse {
    // post 전체 조회
    data: {
      content: PostInfo[];
      totalPages: number;
      totalElements: number;
    };
  }

  // ------ kakao API 관련 데이터 타입
  interface KakaoBookParams {
    query: string;
    sort?: "accuracy" | "latest";
    page?: number;
    size?: number;
    target?: "title" | "isbn" | "publisher" | "person";
  }

  interface KakaoMeta {
    total_count: number;
    // 전체 문서 수
    pageable_count: number;
    is_end: boolean;
  }

  interface KakaoDocument {
    title: string;
    contents: string;
    isbn: string;
    datetime: string;
    authors: string[];
    publisher: string;
    thumbnail: string;
  }

  interface KakaoBookResponse {
    meta: KakaoMeta;
    documents: KakaoDocument[];
  }
}
