export const pages = [
  { name: "홈", link: "../main" },
  { name: "도서 탐색", link: "../search" },
  { name: "피드", link: "../feed" },
  { name: "챌린지", link: "../challenge" },
  { name: "내 서재", link: `../my` },
];

// 내 서재 서브 탭 메뉴 데이터
export const userTabMenus: TabMenuType[] = [
  { label: "⛄소개", value: "INTRO" },
  { label: "📚서재", value: "LIB" },
  { label: "📓독서기록", value: "POST" },
];

// 피드 서브 탭 메뉴 리스트 - 팔로잉 데이터는 나중에
export const feedTabMenus: TabMenuType[] = [
  { label: "전체", value: "ALL" },
  { label: "팔로잉", value: "FOLLOWING" },
];

// 피드 데이터 정렬 탭 메뉴 리스트
export const feedOptionMenus: TabMenuType[] = [
  { label: "최신순", value: "DATE" },
  { label: "댓글순", value: "COMMENT" },
  { label: "추천순", value: "LIKE" },
];

export const challengeTabMenus: TabMenuType[] = [
  { label: "전체", value: "ALL" },
  { label: "참여중", value: "JOINING" },
];
