import Grid from "@mui/material/Unstable_Grid2";
import CommonSection from "components/common/CommonSection";
import MainBookProgressCard from "components/main/MainBookProgressCard";
import CommonTitle from "components/common/CommonTitle";
import MainBookCard from "components/main/MainBookCard";
import CommonLink from "components/common/CommonLink";

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

const MainPage = () => {
  // 로그인한 유저 인지 확인
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Grid
      container
      columnSpacing={2}
      columns={{ xs: 1, md: 10 }}
      sx={{ width: "100%" }}
    >
      {/* 완독했지만 기록작성 안함 - status not_created-post */}
      <Grid xs={1} md={5}>
        <CommonSection maxHight={500}>
          <CommonTitle value="📚 독서 기록을 작성해주세요" />
          {userLibrary.map((bookItem) => (
            <CommonLink to="../write" key={bookItem.bookId}>
              <MainBookCard bookItem={bookItem} />
            </CommonLink>
          ))}
        </CommonSection>
      </Grid>

      {/* 읽기 전 - status before */}
      <Grid xs={1} md={5}>
        <CommonSection maxHight={500}>
          <CommonTitle value="📚 읽을 예정이에요" />
          {userLibrary.map((bookItem) => (
            <MainBookCard key={bookItem.bookId} bookItem={bookItem} />
          ))}
        </CommonSection>
      </Grid>

      {/* 독서진행중 - status reading */}
      <Grid xs={1} md={10}>
        <CommonSection maxHight={700}>
          <CommonTitle value="📚 완독까지 이만큼 남았어요" />
          {userLibrary.map((bookItem) => (
            <MainBookProgressCard
              key={bookItem.bookId}
              bookItem={bookItem}
              isNonMember={isLoggedIn !== null ? false : true}
            />
          ))}
        </CommonSection>
      </Grid>
      <Grid xs={1} md={10}>
        <CommonSection maxHight={700}>
          <CommonTitle value="📚 기간이 지나버린 책들이에요" />
          {userLibrary.map((bookItem) => (
            <MainBookProgressCard
              key={bookItem.bookId}
              bookItem={bookItem}
              isNonMember={isLoggedIn !== null ? false : true}
            />
          ))}
        </CommonSection>
      </Grid>
    </Grid>
  );
};

export default MainPage;
