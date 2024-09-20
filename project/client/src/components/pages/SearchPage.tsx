import { Box } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import RankCard from "components/blocks/search/RankCard";
import ReadDialog from "components/blocks/search/ReadDialog";
import SubmitDialog from "components/blocks/search/SubmitDialog";
import Reasult from "components/blocks/search/Result";
import SmallButton from "components/atoms/SmallButton";
import SearchBar from "components/blocks/SearchBar";
import Section from "components/blocks/Section";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTypography from "components/atoms/CustomTypography";
import { useBookQuery, useBooksQuery } from "hooks/queries/useBookQueries";
import { useEffect, useState } from "react";
import { getStoredToken } from "utils/get";

const SearchPage = () => {
  // 로그인 여부 확인(토큰)
  const memberToken = getStoredToken();

  // 도서 리스트 표출 여부
  const [openBookList, setOpenBookList] = useState(false);

  // 도서 직접 추가하기 Dialog open 여부
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  // 도서 plan 등록 Dialog open 여부
  const [openReadDialog, setOpenReadDialog] = useState(false);

  // 도서 등록 결과 SnackBar open 여부
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // 로그인 오류 SnackBar open 여부
  const [openNotMemberSnackBar, setOpenNotMemberSnackBar] = useState(false);

  // 검색어 - searchBar에서 입력된 값을 가져옴
  const [searchQuery, setSearchQuery] = useState("");

  // 등록된 도서 - 도서등록시 반환되는 도서 id값
  // 도서등록 후 plan 등록으로 연결 시 필요
  const [newBook, setNewBook] = useState<number | null>(null);

  // 도서등록 후 plan 등록으로 연결 하기 위해 도서 정보 조회
  const { data: bookData } = useBookQuery(newBook, { enabled: !!newBook });

  // getbooks 요청 시 사용할 params - 등록된 전체 도서 최초 요청 시
  const allBooksParams: BookParams = {
    page: 1,
    size: 10,
  };

  // getbooks 요청 시 사용할 params - searchQuery가 전달되었을때
  // 일단 제목으로 검색
  const searchBooksParams: BookParams = {
    page: 1,
    size: 5,
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
  const { data: rankBooks } = useBooksQuery(rankBooksParams, {
    enabled: !!rankBooksParams,
    staleTime: 60 * 1000,
  });

  // 책 추가하기
  const handleAddBook = () => {
    setOpenSubmitDialog(true);
  };

  // 등록 Dialog 닫기
  const handleSubmitClose = () => {
    setOpenSubmitDialog(false);
  };

  // SnackBar 닫기
  const handleSnackBarClose = () => {
    if (newBook) {
      setOpenSnackBar(false);
      setOpenBookList(false);
      if (memberToken) {
        // 바로 plan을 등록할 수 있는 Dialog 표출
        setOpenReadDialog(true);
      } else {
        setOpenNotMemberSnackBar(true);
      }
    }
  };

  const handleNotMemberSnackBarClose = () => {
    setOpenNotMemberSnackBar(false);
  };

  // readDialog 닫기
  const handleReadClose = () => {
    setOpenReadDialog(false);
  };

  // 전체 도서 표출 버튼 onClick
  const handleAllBookList = () => {
    setOpenBookList(!openBookList);
  };

  useEffect(() => {
    if (newBook && !openSubmitDialog) {
      // 등록된 새 책이 있다면 성공 SnackBar 띄움
      setOpenSnackBar(true);
    }
  }, [newBook]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* 도서 직접 등록 Dialog */}
      <SubmitDialog
        isOpen={openSubmitDialog}
        handleDialogClose={handleSubmitClose}
        setNewBook={setNewBook}
      />

      {/* 도서 선택하여 Plan 등록 Dialog */}
      {bookData && memberToken && (
        <ReadDialog
          isOpen={openReadDialog}
          handleDialogClose={handleReadClose}
          selectedBook={bookData.data}
        />
      )}

      {/* snackbar */}
      <CustomSnackBar
        text="새로운 도서가 등록되었습니다."
        severity="success"
        open={openSnackBar}
        handleSnackBarClose={handleSnackBarClose}
      />
      <CustomSnackBar
        text="로그인이 필요합니다."
        severity="error"
        open={openNotMemberSnackBar}
        handleSnackBarClose={handleNotMemberSnackBarClose}
      />

      <Box sx={{ display: "flex", flexDirection: "column", mt: 5, mb: -3 }}>
        {/* 페이지 타이틀 */}
        <CustomTypography
          text="🎁 어떤 책을 읽어볼까요? 자유롭게 도서를 탐색하세요!"
          variant="h5"
          bold={true}
        />
        <SmallButton
          buttonText={
            openBookList ? "> 등록된 전체 도서 닫기" : "> 등록된 전체 도서 보기"
          }
          outline={true}
          handleClickEvent={handleAllBookList}
        />
        {/* 원하는 검색결과가 없을 경우 */}
        <SmallButton
          buttonText="📕직접 추가하기"
          outline={false}
          handleClickEvent={handleAddBook}
        />
      </Box>
      {/* 등록된 전체 도서 리스트 표출 */}
      {/* 도서 목록 표출 여부 */}
      {openBookList && (
        <Section>
          <Reasult queryType="sobuk" queryParams={allBooksParams} />
        </Section>
      )}
      {/* 도서검색 */}
      <Section text="📚 도서 검색">
        <SearchBar setSearchQuery={setSearchQuery} />
        {/* 검색 결과 표출 */}
        {searchQuery && (
          <Section text="📚 소북소북 등록 도서">
            <Reasult queryType="sobuk" queryParams={searchBooksParams} />
          </Section>
        )}
        {searchQuery && (
          <Section text="📚 카카오 검색 도서">
            <Reasult queryType="kakao" queryParams={searchBooksParams} />
          </Section>
        )}
      </Section>

      {/* 인기도서 */}
      <Section maxHight={700} text="📚 인기도서 TOP10">
        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {rankBooks?.data.content === undefined ? (
            <Box sx={{ m: 5 }}>
              <CustomTypography
                text="랭킹정보를 가져올 수 없습니다."
                variant="body1"
                bold={true}
              />
            </Box>
          ) : (
            rankBooks.data.content &&
            rankBooks.data.content.map((bookItem) => (
              <RankCard key={bookItem.bookId} bookItem={bookItem} />
            ))
          )}
        </Grid>
      </Section>
    </Box>
  );
};

export default SearchPage;
