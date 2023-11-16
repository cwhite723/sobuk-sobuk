import { Box, Pagination } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useEffect, useState } from "react";
import SearchBookReadDialog from "./SearchBookReadDialog";
import SearchBookSubmitDialog from "./SearchBookSubmitDialog";
import { useMutation, useQuery } from "react-query";
import { getAllBooks, getKakaoBooks, postBookmark } from "apis/books";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { convertBookResponse } from "utils/format";

interface PropsType {
  queryParams: BookParams;
  queryType: "sobuk" | "kakao";
}

// 검색결과목록 표출
const SerarchReasult = (props: PropsType) => {
  // redux에 저장된 토큰 가져오기 - bookmark 요청에 필요
  const token = useSelector((state: RootState) => state.auth.token);

  // 도서 직접 추가하기 Dialog open 여부
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  // plan에 등록할, 사용자가 선택한 도서
  // 선택한 도서의 유무에 따라 Dialog open값을 결정함
  const [selectedBook, setSelectedBook] = useState<BookInfoSimple | undefined>(
    undefined,
  );

  // kakao 검색 api 결과값 or 소북소북 등록 도서 검색 결과값
  const [resultBooks, setResultBooks] = useState<BookInfoSimple[]>([]);

  // pagination 상태값
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // kakao api 검색결과
  const getKakaoResult = async (
    params: KakaoBookParams,
  ): Promise<KakaoBookResponse> => {
    const { data } = await useQuery(
      ["getKakaoBooks", params],
      () => getKakaoBooks(params),
      { enabled: !!params },
    );
    return data;
  };

  // 소북소북 등록 도서중에 검색하기
  const getSobukResult = async (
    params: BookParams,
  ): Promise<BookResponse | undefined> => {
    const { data } = await useQuery(
      ["getAllBooks", params],
      () => getAllBooks(params),
      { enabled: !!params },
    );
    return data;
  };

  // react-query - post bookmark
  const { mutate } = useMutation(postBookmark, {
    onSuccess: async (data) => {
      // bookmark 성공
      console.log(data);
    },
    onError: (error) => {
      // bookmark 실패
      console.log(error);
    },
  });

  // 책 추가하기
  const handleAddBook = () => {
    setOpenSubmitDialog(true);
  };

  // 책 읽기
  const handleReadBook = (book: BookInfoSimple) => {
    setSelectedBook(book);
  };

  // 책 찜하기
  const handleBookmark = async (book: BookInfoSimple, token: string) => {
    if (token) {
      await mutate({ bookId: book.bookId, accessToken: token });
    }
  };

  // Dialog 닫기
  const handleClose = () => {
    setSelectedBook(undefined);
    setOpenSubmitDialog(false);
  };

  useEffect(() => {
    if (props.queryType === "sobuk") {
      // props로 전달된 params의 검색결과(소북소북)
      const fetchSobukResult = async () => {
        const sobukResult = await getSobukResult(props.queryParams);
        if (sobukResult) {
          setResultBooks(sobukResult.content);
          setTotalPages(sobukResult.totalPages);
        }
      };
      fetchSobukResult();
    } else {
      // props로 전달된 params의 검색결과(카카오)
      const fetchKakaoResult = async () => {
        const kakaoResult = await getKakaoResult({
          query: props.queryParams.title ? props.queryParams.title : "",
          page: props.queryParams.page,
          size: props.queryParams.size,
          target: "title",
        });
        if (kakaoResult) {
          setResultBooks(kakaoResult.documents.map(convertBookResponse));
          setTotalPages(kakaoResult.meta.total_count / props.queryParams.size);
        }
      };
      fetchKakaoResult();
    }
  }, [props.queryParams]);

  useEffect(() => {
    // page가 바뀌면 데이터를 새로 요청해야함
    if (props.queryType === "sobuk") {
      const fetchSobukResult = async (page: number) => {
        const sobukResult = await getSobukResult({
          ...props.queryParams,
          page,
        });
        if (sobukResult) {
          setResultBooks(sobukResult.content);
        }
      };
      fetchSobukResult(page);
    } else {
      const fetchKakaoResult = async (page: number) => {
        const kakaoResult = await getKakaoResult({
          query: props.queryParams.title ? props.queryParams.title : "",
          page: page,
          size: props.queryParams.size,
          target: "title",
        });
        if (kakaoResult) {
          setResultBooks(kakaoResult.documents.map(convertBookResponse));
        }
      };
      fetchKakaoResult(page);
    }
  }, [page]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* 원하는 검색결과가 없을 경우 */}
      <CommonButton
        value="📕직접 추가하기"
        outline={false}
        onClick={handleAddBook}
      />

      <SearchBookSubmitDialog
        isOpen={openSubmitDialog}
        handleClose={handleClose}
      />

      {selectedBook && (
        <SearchBookReadDialog
          isOpen={selectedBook !== undefined}
          handleClose={handleClose}
          selectedBook={selectedBook}
        />
      )}

      {/* 검색된 도서 리스트 */}
      {/* 컴포넌트 분리할까 */}
      {resultBooks.map((bookItem) => (
        <Box
          key={bookItem.title}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
            p: 3,
            "&:nth-of-type(odd)": {
              backgroundColor: "background.default",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <CommonTypography
              value={bookItem.title}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={bookItem.author}
              variant="body1"
              bold={false}
            />
            <CommonTypography
              value={bookItem.publisher}
              variant="body1"
              bold={false}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "end", md: "center" },
            }}
          >
            <CommonButton
              value="📖읽기"
              outline={false}
              onClick={() => handleReadBook(bookItem)}
            />
            <CommonButton
              value="📌찜하기"
              outline={false}
              onClick={() => token && handleBookmark(bookItem, token)}
            />
          </Box>
          {totalPages && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SerarchReasult;
