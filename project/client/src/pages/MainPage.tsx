import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MainSection from "components/main/MainSection";
import MainBookProgressCard from "components/main/MainBookProgressCard";
import MainBookRankCard from "components/main/MainBookRankCard";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonTitle from "components/common/CommonTitle";
import MainSerarchReasult from "components/main/MainSearchResult";

// 더미 데이터
const userLibrary: BookItem[] = [
  {
    bookId: 1,
    bookName: "제목1",
    bookWriter: "작가1",
    bookPublish: "출판사1",
    bookPages: 365,
    bookState: "reading",
    bookProgress: 75,
  },
  {
    bookId: 2,
    bookName: "제목2",
    bookWriter: "작가2",
    bookPublish: "출판사2",
    bookPages: 563,
    bookState: "pending",
    bookProgress: 30,
  },
  {
    bookId: 3,
    bookName: "제목3",
    bookWriter: "작가3",
    bookPublish: "출판사3",
    bookPages: 156,
    bookState: "bookmark",
    bookProgress: 0,
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

const bookRanking: BookItem[] = [
  {
    bookId: 1,
    bookName: "제목1",
    bookWriter: "작가1",
    bookPublish: "출판사1",
    bookPages: 365,
    bookIntroduction: "한줄소개1",
  },
  {
    bookId: 2,
    bookName: "제목2",
    bookWriter: "작가2",
    bookPublish: "출판사2",
    bookPages: 365,
    bookIntroduction: "한줄소개2",
  },
  {
    bookId: 3,
    bookName: "제목3",
    bookWriter: "작가3",
    bookPublish: "출판사3",
    bookPages: 365,
    bookIntroduction: "한줄소개3",
  },
  {
    bookId: 4,
    bookName: "제목4",
    bookWriter: "작가4",
    bookPublish: "출판사4",
    bookPages: 365,
    bookIntroduction: "한줄소개4",
  },
  {
    bookId: 5,
    bookName: "제목5",
    bookWriter: "작가5",
    bookPublish: "출판사5",
    bookPages: 365,
    bookIntroduction: "한줄소개5",
  },
  {
    bookId: 6,
    bookName: "제목6",
    bookWriter: "작가6",
    bookPublish: "출판사6",
    bookPages: 365,
    bookIntroduction: "한줄소개6",
  },
  {
    bookId: 7,
    bookName: "제목7",
    bookWriter: "작가7",
    bookPublish: "출판사7",
    bookPages: 365,
    bookIntroduction: "한줄소개7",
  },
  {
    bookId: 8,
    bookName: "제목8",
    bookWriter: "작가8",
    bookPublish: "출판사8",
    bookPages: 365,
    bookIntroduction: "한줄소개8",
  },
  {
    bookId: 9,
    bookName: "제목9",
    bookWriter: "작가9",
    bookPublish: "출판사9",
    bookPages: 365,
    bookIntroduction: "한줄소개9",
  },
  {
    bookId: 10,
    bookName: "제목10",
    bookWriter: "작가10",
    bookPublish: "출판사10",
    bookPages: 365,
    bookIntroduction: "한줄소개10",
  },
];

const MainPage = () => {
  // 로그인한 유저 인지 확인
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Box>
      {/* 도서검색 */}
      <MainSection>
        <CommonTitle value="📚 도서 검색" />
        <CommonSearchBar />
        <MainSerarchReasult />
      </MainSection>

      {/* 독서진행률 */}
      <MainSection>
        <CommonTitle value="📚 완독까지 이만큼 남았어요" />
        {userLibrary.map((bookItem) => (
          <MainBookProgressCard
            key={bookItem.bookId}
            bookItem={bookItem}
            isNonMember={isLoggedIn !== null ? false : true}
          />
        ))}
      </MainSection>

      {/* 인기도서 */}
      <MainSection>
        <CommonTitle value="📚 인기도서 TOP10" />

        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {bookRanking.map((bookItem) => (
            <MainBookRankCard key={bookItem.bookId} bookItem={bookItem} />
          ))}
        </Grid>
      </MainSection>
    </Box>
  );
};

export default MainPage;
