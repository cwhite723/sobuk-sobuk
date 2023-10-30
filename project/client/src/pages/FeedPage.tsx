import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonTabMenu from "components/common/CommonTabMenu";
import FeedOptionMenu from "components/feed/FeedOptionMenu";
import FeedPostCard from "components/feed/FeedPostCard";
import React from "react";

// 피드 서브 탭 메뉴 리스트 데이터
const feedTabMenus = [
  { label: "전체", value: "all" },
  { label: "팔로잉", value: "following" },
];

// 더미 데이터
// 피드 주인
const feedOwners: UserInfo[] = [
  {
    token: "test2",
    userId: "test2",
    userImg: "",
    userName: "test2",
    userIntroduction: "hi",
  },
  {
    token: "test3",
    userId: "test3",
    userImg: "",
    userName: "test3",
    userIntroduction: "hello",
  },
];

const FeedPage = () => {
  // 현재 선택된 서브 탭 메뉴
  const [nowTab, setNowTab] = React.useState(feedTabMenus[0]);

  // 선택된 서브 탭 메뉴 변경 함수
  const handleTabFocus = (newTab: TabMenuType) => {
    setNowTab(newTab);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* 피드 페이지 상단바 */}
      <CommonTabMenu
        handelTabFocus={handleTabFocus}
        nowTab={nowTab}
        tabMenus={feedTabMenus}
      />
      {/* <FeedTopMenu /> */}

      {/* 피드 상단(정렬) */}
      <FeedOptionMenu />

      {/* 피드 container 영역 */}
      <Grid container spacing={4} columns={{ xs: 1, md: 10 }}>
        {/* 피드 item */}
        {feedOwners.map((element) => (
          <FeedPostCard key={element.token} userInfo={element} />
        ))}
      </Grid>

      {/* pagination 구현 필요*/}
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}
      >
        <Pagination count={10} />
      </Box>
    </Box>
  );
};
export default FeedPage;
