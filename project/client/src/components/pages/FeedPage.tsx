import { Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CustomLink from "components/atoms/CustomLink";
import TabMenu from "components/blocks/TabMenu";
import CustomTypography from "components/atoms/CustomTypography";
import PostCard from "components/blocks/feed/PostCard";
import { feedOptionMenus } from "constants/menus";
import usePostsQuery from "hooks/queries/posts/usePostsQuery";
import { useEffect, useState } from "react";
import { getStoredToken } from "utils/get";

const FeedPage = () => {
  const memberToken = getStoredToken();

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  // 해당 state값에 따라서 피드 데이터를 바꿈
  // 현재 선택된 서브 탭 메뉴
  // 팔로잉 모아보기 나중에 추가
  // const [nowTab, setNowTab] = useState(feedTabMenus[0]);
  // 현재 선택된 정렬 옵션 탭 메뉴
  const [nowOptionTab, setNowOptionTab] = useState(feedOptionMenus[0]);

  // 데이터 요청에 필요한 params
  const [params, setParams] = useState<PostParams>({
    page: page,
    size: 4,
    sortType: nowOptionTab.value,
  });

  // 데이터 response가 저장될 state
  const [posts, setPosts] = useState<PostInfo[]>();

  // 선택된 서브 탭 메뉴 변경 함수
  // const handleTabFocus = (newTab: TabMenuType) => {
  //   setNowTab(newTab);
  // };

  // 선택된 정렬 옵션 탭 메뉴 변경 함수
  const handleOptionTabFocus = (newTab: TabMenuType) => {
    setNowOptionTab(newTab);
    setParams((prevParams) => ({
      ...prevParams,
      sortType: newTab.value,
    }));
  };

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // react-query - get posts
  const { data: postsData, isSuccess: isPostsSuccess } = usePostsQuery(
    params,
    memberToken,
    {
      enabled: !!params,
    },
  );

  // 페이지네이션
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page: page,
    }));
    setPosts([]);
  }, [page]);

  useEffect(() => {
    if (isPostsSuccess && postsData) {
      setPosts(postsData.data.content);
      setTotalPages(postsData.data.totalPages);
    }
  }, [isPostsSuccess, postsData]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* post 작성 버튼 */}
      <Box sx={{ position: "fixed", top: "100px", right: "50px" }}>
        <CustomLink to="../write">
          <CustomTypography text="✏POST" variant="body1" bold={true} />
        </CustomLink>
      </Box>

      {/* 피드 페이지 상단바 / 팔로잉 모아보기 구현되면 */}
      {/* <CommonTabMenu
        handelTabFocus={handleTabFocus}
        nowTab={nowTab}
        tabMenus={feedTabMenus}
      /> */}

      {/* 피드 상단(정렬) */}
      <TabMenu
        handelTabFocus={handleOptionTabFocus}
        nowTab={nowOptionTab}
        allTabs={feedOptionMenus}
      />

      {/* 피드 container 영역 */}
      <Grid container spacing={4} columns={{ xs: 1, md: 10 }}>
        {/* 피드 item */}
        {/* 기본 전체 데이터 */}
        {posts &&
          posts.map((postItem) => (
            <PostCard key={postItem.postId} postItem={postItem} />
          ))}
      </Grid>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}
      >
        {totalPages ? (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          <CustomTypography
            text="피드가 존재하지 않습니다."
            variant="h5"
            bold={true}
          />
        )}
      </Box>
    </Box>
  );
};
export default FeedPage;
