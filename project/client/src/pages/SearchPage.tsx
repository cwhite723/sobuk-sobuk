import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllBooks } from "apis/books";
import SearchBookRankCard from "components/Search/SearchBookRankCard";
import SearchBookSubmitDialog from "components/Search/SearchBookSubmitDialog";
import SerarchReasult from "components/Search/SearchResult";
import CommonButton from "components/common/CommonButton";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonSection from "components/common/CommonSection";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import { useQuery } from "react-query";

const SearchPage = () => {
  // 도서 리스트 표출 여부
  const [openBookList, setOpenBookList] = useState(false);

  // 도서 직접 추가하기 Dialog open 여부
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  // 도서 등록 결과 SnackBar open 여부
  const [openSnackBar, setOpenSnackBar] = useState(false);

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
    sortType: "readingPlansCount",
  };

  // react-query get books - 인기도서 요청
  const { data: rankBooks } = useQuery(
    ["getAllBooks", rankBooksParams],
    () => getAllBooks(rankBooksParams),
    { enabled: !!rankBooksParams },
  );

  // 책 추가하기
  const handleAddBook = () => {
    setOpenSubmitDialog(true);
  };

  // Dialog 닫기
  const handleClose = () => {
    setOpenSubmitDialog(false);
    setOpenSnackBar(true);
  };

  // SnackBar 닫기
  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
    setOpenBookList(false);
  };

  // 전체 도서 표출 버튼 onClick
  const handleAllBookList = () => {
    setOpenBookList(!openBookList);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SearchBookSubmitDialog
        isOpen={openSubmitDialog}
        handleClose={handleClose}
      />

      {/* snackbar */}
      {openSnackBar && (
        <CommonSnackBar
          value="새로운 도서가 등록되었습니다."
          severity="success"
          open={openSnackBar}
          handleClose={handleSnackBarClose}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", mt: 5, mb: -3 }}>
        <CommonTitle value="🎁 어떤 책을 읽어볼까요? 자유롭게 도서를 탐색하세요!" />
        <CommonButton
          value={
            openBookList ? "> 등록된 전체 도서 닫기" : "> 등록된 전체 도서 보기"
          }
          outline={true}
          onClick={handleAllBookList}
        />
        {/* 원하는 검색결과가 없을 경우 */}
        <CommonButton
          value="📕직접 추가하기"
          outline={false}
          onClick={handleAddBook}
        />
      </Box>

      {/* 등록된 전체 도서 리스트 표출 */}
      {/* 도서 목록 표출 여부 */}
      {openBookList && (
        <CommonSection>
          <SerarchReasult queryType="sobuk" queryParams={allBooksParams} />
        </CommonSection>
      )}

      {/* 도서검색 */}
      <CommonSection>
        <CommonTitle value="📚 도서 검색" />
        <CommonSearchBar setSearchQuery={setSearchQuery} />
        {/* 검색 결과 표출 */}
        {searchQuery && (
          <CommonSection>
            <CommonTitle value="📚 소북소북 등록 도서" />
            <SerarchReasult queryType="sobuk" queryParams={searchBooksParams} />
          </CommonSection>
        )}
        {searchQuery && (
          <CommonSection>
            <CommonTitle value="📚 카카오 검색 도서" />
            <SerarchReasult queryType="kakao" queryParams={searchBooksParams} />
          </CommonSection>
        )}
      </CommonSection>

      {/* 인기도서 */}
      <CommonSection maxHight={700}>
        <CommonTitle value="📚 인기도서 TOP10" />
        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {rankBooks?.data.content === undefined ? (
            <CommonTypography
              value="랭킹정보를 가져올 수 없습니다."
              variant="body1"
              bold={true}
            />
          ) : (
            rankBooks.data.content &&
            rankBooks.data.content.map((bookItem) => (
              <SearchBookRankCard key={bookItem.bookId} bookItem={bookItem} />
            ))
          )}
        </Grid>
      </CommonSection>
    </Box>
  );
};

export default SearchPage;
