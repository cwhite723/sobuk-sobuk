import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllBooks } from "apis/books";
import SearchBookRankCard from "components/Search/SearchBookRankCard";
import SerarchReasult from "components/Search/SearchResult";
import CommonButton from "components/common/CommonButton";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import { useQuery } from "react-query";

const SearchPage = () => {
  // 도서 리스트 표출 여부
  const [openBookList, setOpenBookList] = useState(false);
  // 검색어 - searchBar에서 입력된 값을 가져옴
  const [searchQuery, setSearchQuery] = useState("");

  // getbooks 요청 시 사용할 params - 등록된 전체 도서 최초 요청 시
  const allBooksParams: BookParams = {
    page: 1,
    size: 10,
    sortType: "publicationDate",
  };

  // getbooks 요청 시 사용할 params - searchQuery가 전달되었을때
  // 일단 제목으로 검색
  const searchBooksParams: BookParams = {
    page: 1,
    size: 5,
    sortType: "publicationDate",
    title: searchQuery,
  };

  // getbooks 요청 시 사용할 params - 인기도서 최초 요청 시
  // 업데이트 기준 정해서 요청하기 => 수정 필요
  const rankBooksParams: BookParams = {
    page: 1,
    size: 10,
    sortType: "recordCount",
  };

  // react-query get books - 인기도서 요청
  const { data: rankBooks } = useQuery(
    ["getAllBooks", rankBooksParams],
    () => getAllBooks(rankBooksParams),
    { enabled: !!rankBooksParams },
  );

  // 전체 도서 표출 버튼 onClick
  const handleAllBookList = () => {
    setOpenBookList(!openBookList);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 5, mb: -3 }}>
        <CommonTitle value="🎁 어떤 책을 읽어볼까요? 자유롭게 도서를 탐색하세요!" />
        <CommonButton
          value={
            openBookList ? "> 등록된 전체 도서 닫기" : "> 등록된 전체 도서 보기"
          }
          outline={true}
          onClick={handleAllBookList}
        />
      </Box>

      {/* 등록된 전체 도서 리스트 표출 */}
      {/* 도서 목록 표출 여부 */}
      {openBookList && (
        <CommonSection maxHight={700}>
          <SerarchReasult queryType="sobuk" queryParams={allBooksParams} />
        </CommonSection>
      )}

      {/* 도서검색 */}
      <CommonSection maxHight={700}>
        <CommonTitle value="📚 도서 검색" />
        <CommonSearchBar setSearchQuery={setSearchQuery} />
        {/* 검색 결과 표출 */}
        {searchQuery && (
          <SerarchReasult queryType="sobuk" queryParams={searchBooksParams} />
        )}
        {searchQuery && (
          <SerarchReasult queryType="kakao" queryParams={searchBooksParams} />
        )}
      </CommonSection>

      {/* 인기도서 */}
      <CommonSection maxHight={700}>
        <CommonTitle value="📚 인기도서 TOP10" />
        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {rankBooks ? (
            rankBooks.content.map((bookItem) => (
              <SearchBookRankCard key={bookItem.bookId} bookItem={bookItem} />
            ))
          ) : (
            <CommonTypography
              value="랭킹정보를 가져올 수 없습니다."
              variant="body1"
              bold={true}
            />
          )}
        </Grid>
      </CommonSection>
    </Box>
  );
};

export default SearchPage;
