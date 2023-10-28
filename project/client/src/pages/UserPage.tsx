import { Box } from "@mui/material";
import CommonTabMenu from "components/common/CommonTabMenu";
import UserBookList from "components/user/UserBookList";
import UserIntroProfile from "components/user/UserIntroProfile";
import UserPostList from "components/user/UserPostList";
import UserSetting from "components/user/UserSetting";
import React from "react";

// 내 서재 서브 탭 메뉴 데이터
const userTabMenus = [
  { label: "⛄소개", value: "intro" },
  { label: "📚서재", value: "lib" },
  { label: "📓독서기록", value: "post" },
  { label: "🔐계정정보/탈퇴", value: "setting" },
];

const UserPage = () => {
  // 현재 선택된 탭 메뉴
  const [nowTab, setNowTab] = React.useState(userTabMenus[0]);

  // 로그인한 유저 이름
  const [userName, setUserName] = React.useState("윤정");

  // 로그인한 유저의 도서 리스트
  const [userBookCount, setUserBookCount] = React.useState(4);

  // 로그인한 유저의 기록 리스트
  const [userPostCount, setUserPostCount] = React.useState(2);

  // 선택된 탭 메뉴를 변경하는 함수
  const handelTabFocus = (newSelectMenu: TabMenuType) => {
    setNowTab(newSelectMenu);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* 유저(내서재) 페이지 상단바 */}
      <CommonTabMenu
        handelTabFocus={handelTabFocus}
        tabMenus={userTabMenus}
        nowTab={nowTab}
      />

      {/* 유저페이지 전체 container 영역(기본) */}
      {/* 상단 메뉴 선택에 따라 바뀌어야 하는 영역 */}

      {/* 유저페이지 소개 선택시 표출 영역 */}
      {nowTab.value === "intro" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <UserIntroProfile />

          {/* 유저 서재 도서 미리보기 */}
          {/* 최신순 4개만 보여줌 */}
          <UserBookList userName={userName} userBookCount={userBookCount} />

          {/* 유저 독서 기록 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserPostList userName={userName} userPostCount={userPostCount} />
        </Box>
      )}

      {/* 유저페이지 서재 선택시 표출 영역 */}
      {/* 전체도서 표출 */}
      {nowTab.value === "lib" && (
        <UserBookList userName={userName} userBookCount={userBookCount} />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {nowTab.value === "post" && (
        <UserPostList userName={userName} userPostCount={userPostCount} />
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {nowTab.value === "setting" && <UserSetting />}
    </Box>
  );
};
export default UserPage;
