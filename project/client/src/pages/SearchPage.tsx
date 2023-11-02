import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchBookRankCard from "components/Search/SearchBookRankCard";
import SerarchReasult from "components/Search/SearchResult";
import CommonButton from "components/common/CommonButton";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import { useState } from "react";

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

const SearchPage = () => {
  const [allBookList, setAllBookList] = useState(false);

  const handleAllBookList = () => {
    setAllBookList(!allBookList);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 5, mb: -3 }}>
        <CommonTitle value="🎁 어떤 책을 읽어볼까요? 자유롭게 도서를 탐색하세요!" />
        <CommonButton
          value={
            allBookList ? "> 등록된 전체 도서 닫기" : "> 등록된 전체 도서 보기"
          }
          outline={true}
          onClick={handleAllBookList}
        />
      </Box>
      {allBookList && (
        <CommonSection maxHight={700}>
          <SerarchReasult />
        </CommonSection>
      )}
      {/* 도서검색 */}
      <CommonSection maxHight={700}>
        <CommonTitle value="📚 도서 검색" />
        <CommonSearchBar />
        <SerarchReasult />
      </CommonSection>

      {/* 인기도서 */}
      <CommonSection maxHight={700}>
        <CommonTitle value="📚 인기도서 TOP10" />
        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {bookRanking.map((bookItem) => (
            <SearchBookRankCard key={bookItem.bookId} bookItem={bookItem} />
          ))}
        </Grid>
      </CommonSection>
    </Box>
  );
};

export default SearchPage;
