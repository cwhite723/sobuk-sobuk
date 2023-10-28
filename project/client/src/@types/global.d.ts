export {};

declare global {
  interface TabMenuType {
    label: string;
    value: string;
  }

  interface BookItem {
    bookId: number;
    bookName: string;
    bookWriter: string;
    bookPublish: string;
  }

  interface UserInfo {
    token: string;
    userId: string;
    userName: string;
    userIntroduction: string;
    userImg: string;
  }
}
