import { Box, Pagination } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useEffect, useState } from "react";
import SearchBookReadDialog from "./SearchBookReadDialog";
import { useMutation, useQuery } from "react-query";
import { getAllBooks, getKakaoBooks, postBook, postBookmark } from "apis/books";
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

  // plan에 등록할, 사용자가 선택한 도서
  // 선택한 도서의 유무에 따라 Dialog open값을 결정함
  const [selectedBook, setSelectedBook] = useState<BookInfoSimple | undefined>(
    undefined,
  );

  // 검색에 필요한 query params
  const [params, setParams] = useState<BookParams>(props.queryParams);

  // kakao 검색 api 결과값 or 소북소북 등록 도서 검색 결과값
  const [resultBooks, setResultBooks] = useState<BookInfoSimple[]>();

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

  const { data } = useQuery(
    ["getAllBooks", params],
    () => getAllBooks(params),
    {
      onSuccess(data) {
        if (props.queryType === "sobuk") {
          setResultBooks([...data.data.content]);
          setTotalPages(data.data.totalPages);
        }
      },
      enabled: !!params,
      retry: false,
    },
  );

  const { data: kakaoData } = useQuery(
    ["getKakaoBooks", params],
    () =>
      getKakaoBooks({
        page: params.page,
        size: params.size,
        query: params.title ? params.title : "",
        target: "title",
      }),
    {
      onSuccess(data) {
        if (props.queryType === "kakao") {
          setResultBooks([]);
          const newData = data.documents.map((item) =>
            convertBookResponse(item),
          );
          setResultBooks(() => newData);
          setTotalPages(
            Math.ceil(data.meta.pageable_count / params.size) > 50
              ? 50
              : Math.ceil(data.meta.pageable_count / params.size),
          );
        }
      },
      enabled: !!params,
      retry: false,
    },
  );

  // react-query - post book
  const { mutate: bookMutate } = useMutation(postBook, {
    onSuccess: (data) => {
      // 도서 등록 성공
      console.log("도서 등록", data);
    },
    onError: (error) => {
      // 도서 등록 실패
      console.log("도서 등록 실패", error);
    },
  });

  // react-query - post bookmark
  const { mutate: bookmarkMutate } = useMutation(postBookmark, {
    onSuccess: async (data) => {
      // bookmark 성공
      console.log(data);
    },
    onError: (error) => {
      // bookmark 실패
      console.log(error);
    },
  });

  // 책 읽기
  const handleReadBook = (book: BookInfoSimple) => {
    bookMutate({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publicationDate: book.publicationDate ? book.publicationDate : "정보없음",
      isUserInput: false,
    });
    setSelectedBook(book);
  };

  // 책 찜하기
  const handleBookmark = async (book: BookInfoSimple, token: string) => {
    if (token) {
      await bookmarkMutate({ bookId: book.bookId, accessToken: token });
    }
  };

  // Dialog 닫기
  const handleClose = () => {
    setSelectedBook(undefined);
  };

  useEffect(() => {
    setParams((prevParams) => ({ ...prevParams, page }));
    setResultBooks([]);
  }, [page]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {selectedBook && (
        <SearchBookReadDialog
          isOpen={selectedBook !== undefined}
          handleClose={handleClose}
          selectedBook={selectedBook}
        />
      )}

      {/* 검색된 도서 리스트 */}
      {/* 컴포넌트 분리할까 */}
      {resultBooks &&
        resultBooks.length > 0 &&
        resultBooks.map((bookItem) => (
          <Box
            key={bookItem.bookId}
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
                flexDirection: "column",
              }}
            >
              <CommonTypography
                value={bookItem.title}
                variant="body1"
                bold={true}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
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
          </Box>
        ))}
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
  );
};

export default SerarchReasult;
