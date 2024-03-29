import { Box, Pagination } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { getAllChallenges } from "apis/challenges";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import TabMenu from "components/blocks/TabMenu";
import ChallengeCard from "components/blocks/challenge/ChallengeCard";
import { challengeTabMenus } from "constants/menus";
import {
  useChallengesQuery,
  useMyChallengesQuery,
} from "hooks/queries/useChallengeQueries";
import { useEffect, useState } from "react";
import { getStoredToken } from "utils/get";

const ChallengePage = () => {
  const memberToken = getStoredToken();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(10);
  const [challenges, setChallenges] = useState<ChallengeInfo[]>();

  // 현재 선택된 정렬 옵션 탭 메뉴
  const [nowOptionTab, setNowOptionTab] = useState(challengeTabMenus[0]);

  // 데이터 요청에 필요한 params
  const [params, setParams] = useState<ChallengeParams>({
    page: page,
    size: 4,
  });

  // 선택된 정렬 옵션 탭 메뉴 변경 함수
  const handleOptionTabFocus = (newTab: TabMenuType) => {
    setNowOptionTab(newTab);
  };

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // react-query - get challenges
  const { data: challengesData, isSuccess: isChallengesSuccess } =
    useChallengesQuery(params, {
      enabled: !!params,
    });

  // react-query - get my challenges
  const { data: myChallengesData, isSuccess: isMyChallengesSuccess } =
    useMyChallengesQuery(params, memberToken, {
      enabled: !!params,
    });

  // 페이지네이션
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page: page,
    }));
    setChallenges([]);
  }, [page]);

  useEffect(() => {
    if (isChallengesSuccess && challengesData && nowOptionTab.value === "ALL") {
      setChallenges(challengesData.data.content);
      setTotalPages(challengesData.data.totalPages);
    }
  }, [isChallengesSuccess, challengesData, nowOptionTab]);

  useEffect(() => {
    if (
      isMyChallengesSuccess &&
      myChallengesData &&
      nowOptionTab.value === "JOINING"
    ) {
      setChallenges(myChallengesData.data.content);
      setTotalPages(myChallengesData.data.totalPages);
    }
  }, [isMyChallengesSuccess, myChallengesData, nowOptionTab]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* challenge 생성 버튼 */}
      <Box sx={{ position: "fixed", top: "100px", right: "50px" }}>
        <CustomLink to="../create">
          <CustomTypography text="✨생성하기" variant="body1" bold={true} />
        </CustomLink>
      </Box>

      {/* 챌린지 상단(정렬) */}
      <TabMenu
        handelTabFocus={handleOptionTabFocus}
        nowTab={nowOptionTab}
        allTabs={challengeTabMenus}
      />

      {/* 챌린지 container 영역 */}
      <Grid container spacing={4} columns={{ xs: 1, md: 10 }}>
        {/* 챌린지 item */}
        {/* 기본 전체 데이터 */}
        {challenges &&
          challenges.map((challengeItem) => (
            <ChallengeCard
              key={challengeItem.bookId}
              challengeItem={challengeItem}
            />
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
            text="챌린지가 존재하지 않습니다."
            variant="h5"
            bold={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChallengePage;
