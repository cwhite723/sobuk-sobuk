export {};

declare global {
  interface TabMenuType {
    label: string;
    value: string;
  }

  type DialogType = "read" | "progress" | "submit";

  type BookState = "before" | "reading" | "after" | "complete";

  interface BookItem {
    bookId: number;
    bookName: string;
    bookWriter: string;
    bookPublish: string;
    bookPages: number;
    bookIntroduction?: string;
    bookImg?: string;
    bookState?: BookState;
    bookProgress?: number;
    bookDate?: Date[];
  }

  interface PostItem {
    postId: number;
    postBookInfo: BookItem;
    postTitle: string;
    postOwner: UserInfo;
    postContents: string;
    postCommentsCount: number;
    postLikeCount: number;
  }

  interface UserInfo {
    token: string;
    userId: string;
    userName: string;
    userIntroduction: string;
    userImg: string;
  }
}
