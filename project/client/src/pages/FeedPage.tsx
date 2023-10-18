import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonTabMenu from "components/common/CommonTabMenu";
import FeedOptionMenu from "components/feed/FeedOptionMenu";
import FeedPostCard from "components/feed/FeedPostCard";
import React from "react";

const feedTabMenus = [
  { label: "전체", value: "all" },
  { label: "팔로잉", value: "following" },
];

type tabMenuType = { label: string; value: string };

const FeedPage = () => {
  const [nowTab, setNowTab] = React.useState(feedTabMenus[0]);

  const handleTabFocus = (newTab: tabMenuType) => {
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
      <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
        {/* 피드 item */}
        <FeedPostCard />
        <FeedPostCard />
        <FeedPostCard />
        <FeedPostCard />
        <FeedPostCard />
        <FeedPostCard />
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
