// 팔로우 여부를 확인하는 함수
export const isFollow = (otherMemberInfo: OtherMemberInfo) => {
  if (otherMemberInfo.following) {
    // 팔로우 상태면
    return true;
  }
  // 팔로우 상태가 아니면
  return false;
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
