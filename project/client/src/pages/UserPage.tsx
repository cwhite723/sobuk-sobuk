import { Box, Tab, Tabs } from "@mui/material";
import UserBookList from "components/user/UserBookList";
import UserIntroProfile from "components/user/UserIntroProfile";
import UserPostList from "components/user/UserPostList";
import UserSetting from "components/user/UserSetting";
import React from "react";

type TabMenu = "intro" | "lib" | "post" | "setting";

const UserPage = () => {
  const [selectTab, setSelectTab] = React.useState<TabMenu>("intro");
  const [isOwner, setIsOwner] = React.useState<boolean>(true);
  const [userName, setUserName] = React.useState("윤정");
  const [userBookCount, setUserBookCount] = React.useState(4);
  const [userPostCount, setUserPostCount] = React.useState(2);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newSelectMenu: TabMenu,
  ) => {
    setSelectTab(newSelectMenu);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* 유저(내서재) 페이지 상단바 */}
      {/* MUI Tab Menu 적용하기 */}
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Tabs
          value={selectTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="user page tab menu"
          sx={{
            "& .MuiTab-root": {
              color: "text.primary",
            },
            "& .MuiTab-focused": {
              color: "text.primary",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "text.primary",
            },
          }}
        >
          <Tab label="⛄소개" value="intro" />
          <Tab label="📚서재" value="lib" />
          <Tab label="📓독서기록" value="post" />
          {isOwner && <Tab label="🔐계정정보/탈퇴" value="setting" />}
        </Tabs>
      </Box>

      {/* 유저페이지 전체 container 영역(기본) */}
      {/* 상단 메뉴 선택에 따라 바뀌어야 하는 영역 */}
      {selectTab === "intro" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <UserIntroProfile isOwner={isOwner} />

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
      {selectTab === "lib" && (
        <UserBookList userName={userName} userBookCount={userBookCount} />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {selectTab === "post" && (
        <UserPostList userName={userName} userPostCount={userPostCount} />
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {selectTab === "setting" && <UserSetting />}
    </Box>
  );
};
export default UserPage;
