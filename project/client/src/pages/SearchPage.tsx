import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getAllBooks, getBook } from "apis/books";
import SearchBookRankCard from "components/Search/SearchBookRankCard";
import SearchBookReadDialog from "components/Search/SearchBookReadDialog";
import SearchBookSubmitDialog from "components/Search/SearchBookSubmitDialog";
import SerarchReasult from "components/Search/SearchResult";
import CommonButton from "components/common/CommonButton";
import CommonSearchBar from "components/common/CommonSearchBar";
import CommonSection from "components/common/CommonSection";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const SearchPage = () => {
  // 로그인 여부 확인(토큰)
  const memberToken = useSelector((state: RootState) => state.auth.token);

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
  const { data: bookData } = useQuery(
    ["getBook", newBook],
    () => getBook(newBook ? newBook : 0),
    {
      enabled: !!newBook,
    },
  );

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
    { enabled: !!rankBooksParams, retry: false },
  );

  // 책 추가하기
  const handleAddBook = () => {
    setOpenSubmitDialog(true);
  };

  // Dialog 닫기
  const handleClose = () => {
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
      <SearchBookSubmitDialog
        isOpen={openSubmitDialog}
        handleClose={handleClose}
        setNewBook={setNewBook}
      />

      {bookData && memberToken && (
        <SearchBookReadDialog
          isOpen={openReadDialog}
          handleClose={handleReadClose}
          selectedBook={bookData.data}
        />
      )}

      {/* snackbar */}
      {openSnackBar && (
        <CommonSnackBar
          text="새로운 도서가 등록되었습니다."
          severity="success"
          open={openSnackBar}
          handleSnackBarClose={handleSnackBarClose}
        />
      )}

      {openNotMemberSnackBar && (
        <CommonSnackBar
          text="로그인이 필요합니다."
          severity="error"
          open={openNotMemberSnackBar}
          handleSnackBarClose={handleNotMemberSnackBarClose}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", mt: 5, mb: -3 }}>
        <CommonTitle text="🎁 어떤 책을 읽어볼까요? 자유롭게 도서를 탐색하세요!" />
        <CommonButton
          buttonText={
            openBookList ? "> 등록된 전체 도서 닫기" : "> 등록된 전체 도서 보기"
          }
          outline={true}
          handleClickEvent={handleAllBookList}
        />
        {/* 원하는 검색결과가 없을 경우 */}
        <CommonButton
          buttonText="📕직접 추가하기"
          outline={false}
          handleClickEvent={handleAddBook}
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
        <CommonTitle text="📚 도서 검색" />
        <CommonSearchBar setSearchQuery={setSearchQuery} />
        {/* 검색 결과 표출 */}
        {searchQuery && (
          <CommonSection>
            <CommonTitle text="📚 소북소북 등록 도서" />
            <SerarchReasult queryType="sobuk" queryParams={searchBooksParams} />
          </CommonSection>
        )}
        {searchQuery && (
          <CommonSection>
            <CommonTitle text="📚 카카오 검색 도서" />
            <SerarchReasult queryType="kakao" queryParams={searchBooksParams} />
          </CommonSection>
        )}
      </CommonSection>

      {/* 인기도서 */}
      <CommonSection maxHight={700}>
        <CommonTitle text="📚 인기도서 TOP10" />
        {/* 도서container */}
        <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
          {/* 도서item */}
          {rankBooks?.data.content === undefined ? (
            <CommonTypography
              text="랭킹정보를 가져올 수 없습니다."
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
