import { getDateObject } from "./format";

// 오늘부터 endDate 사이의 일수 구하기
export const getDaysDiff = (endDate: string) => {
  const day = 1000 * 60 * 60 * 24;
  const endDateObject = getDateObject(endDate);

  if (!endDateObject) {
    return null;
  }

  const timeDiff = endDateObject.getTime() - new Date().getTime();
  const dayDiff = Math.ceil(timeDiff / day);

  return dayDiff;
};

// 남은 페이지 수를 완독까지 남은 기간으로 나누어 오늘 읽어야하는 페이지 수 구하기
export const getTodayPage = (leftPage: number, leftDate: number) => {
  return Math.ceil(leftPage / leftDate);
};

// 읽은 페이지의 퍼센트 계산
export const getPercent = (currentPage: number, totalPage: number) => {
  return currentPage === 0 ? 0 : Math.ceil((currentPage / totalPage) * 100);
};
