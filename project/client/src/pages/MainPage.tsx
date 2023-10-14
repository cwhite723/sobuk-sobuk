import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainSection from "components/main/MainSection";
import MainBookProgressCard from "components/main/MainBookProgressCard";
import MainBookRankCard from "components/main/MainBookRankCard";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonTitle from "components/common/CommonTitle";

const MainPage = () => {
  return (
    <Box>
      {/* 도서검색 */}
      <MainSection>
        <CommonTitle value="📚 도서 검색" />
        <CommonSearchBar />
      </MainSection>

      {/* 독서진행률 */}
      <MainSection>
        <CommonTitle value="📚 완독까지 이만큼 남았어요" />
        <MainBookProgressCard isNonMember={true} />
        <MainBookProgressCard isComplete={true} />
        <MainBookProgressCard isNonMember={false} />
        <MainBookProgressCard isNonMember={false} />
        <MainBookProgressCard isNonMember={false} />
      </MainSection>

      {/* 인기도서 */}
      <MainSection>
        <CommonTitle value="📚 인기도서 TOP10" />

        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
          <MainBookRankCard />
        </Grid>
      </MainSection>
    </Box>
  );
};

export default MainPage;
