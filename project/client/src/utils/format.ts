// Date 정보를 string 형태의 값으로 변환
export const getStringDate = (dateValue: Date) => {
  const date = dateValue;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// string 형태의 날짜 정보 유효성 검사 return boolean
export const isValidDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

// string 형태의 날짜 정보를 Date 객체로 변환
export const getDateObject = (stringDate: string) => {
  const [year, month, day] = stringDate.split("-").map(Number);

  if (isValidDate(year, month, day)) {
    const date = new Date(year, month - 1, day);
    return date;
  } else {
    return null;
  }
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
    image: document.thumbnail,
  };
};
