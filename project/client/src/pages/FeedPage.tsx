import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonTabMenu from "components/common/CommonTabMenu";
import FeedOptionMenu from "components/feed/FeedOptionMenu";
import FeedPostCard from "components/feed/FeedPostCard";
import React, { useState } from "react";

// 피드 서브 탭 메뉴 리스트 데이터
const feedTabMenus = [
  { label: "전체", value: "all" },
  { label: "팔로잉", value: "following" },
];

// 더미 데이터
const userLibrary: BookItem[] = [
  {
    bookId: 1,
    bookName: "제목1",
    bookWriter: "작가1",
    bookPublish: "출판사1",
    bookPages: 365,
    bookState: "reading",
    bookProgress: 278,
    bookDate: [new Date("2023-10-25"), new Date("2023-11-25")],
  },
  {
    bookId: 2,
    bookName: "제목2",
    bookWriter: "작가2",
    bookPublish: "출판사2",
    bookPages: 563,
    bookState: "after",
    bookProgress: 550,
  },
  {
    bookId: 3,
    bookName: "제목3",
    bookWriter: "작가3",
    bookPublish: "출판사3",
    bookPages: 156,
    bookState: "before",
    bookProgress: 0,
    bookDate: [new Date("2023-10-25"), new Date("2023-11-25")],
  },
  {
    bookId: 4,
    bookName: "제목4",
    bookWriter: "작가4",
    bookPublish: "출판사4",
    bookPages: 298,
    bookState: "complete",
    bookProgress: 298,
  },
];

// 피드 주인
const feedOwners: MemberInfo[] = [
  {
    userName: "test2",
    nickname: "test2",
    password: "",
    email: "email",
    introduction: "hi",
  },
  {
    userName: "test4",
    nickname: "test4",
    password: "",
    email: "email",
    introduction: "hi",
  },
];

const allPost: PostItem[] = [
  {
    postId: 1,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[0],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 2,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[1],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 3,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[0],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 4,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[1],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
];

const FeedPage = () => {
  // 현재 선택된 서브 탭 메뉴
  // 해당 state값에 따라서 피드 데이터를 바꿈
  const [nowTab, setNowTab] = React.useState(feedTabMenus[0]);

  // pagination state
  const [page, setPage] = useState(1);

  // 선택된 서브 탭 메뉴 변경 함수
  const handleTabFocus = (newTab: TabMenuType) => {
    setNowTab(newTab);
  };

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
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
        {allPost.map((postItem) => (
          <FeedPostCard key={postItem.postId} postItem={postItem} />
        ))}
      </Grid>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}
      >
        <Pagination count={10} page={page} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};
export default FeedPage;
