export {};

declare global {
  interface tabMenuType {
    label: string;
    value: string;
  }
  interface BookItem {
    bookId: number;
    bookName: string;
    writer: string;
    publish: string;
  }
}
