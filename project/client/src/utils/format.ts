import { isValidDate } from "./check";

// Date 객체를 string 형태의 값으로 변환
export const getStringDate = (dateValue: Date) => {
  return `${dateValue.getFullYear()}-${String(
    dateValue.getMonth() + 1,
  ).padStart(2, "0")}-${String(dateValue.getDate()).padStart(2, "0")}`;
};

// string 형태의 날짜 정보를 Date 객체로 변환
export const getDateObject = (stringDate: string) => {
  const [year, month, day] = stringDate.split("-").map(Number);

  if (!isValidDate(year, month, day)) {
    return null;
  }
  const date = new Date(year, month - 1, day);

  return date;
};

// KakaoDocument 타입의 객체를 BookInfoSimple 타입의 객체로 변환
export const convertBookResponse = (
  document: KakaoDocument,
): BookInfoSimple => {
  return {
    bookId: new Date().getTime(),
    title: document.title,
    author: document.authors[0],
    publisher: document.publisher,
    publicationDate: getStringDate(new Date(document.datetime)),
    imageUrl: document.thumbnail,
  };
};
