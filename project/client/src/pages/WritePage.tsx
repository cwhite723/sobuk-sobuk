import { Box } from "@mui/material";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import WritePostBookItem from "components/write/WritePostBookItem";
import WritePostForm from "components/write/WritePostForm";
import { useState } from "react";

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
const WritePage = () => {
  // 선택된 책
  const [selectBook, setSelectBook] = useState<BookItem | null>(null);

  // 선택된 책을 컨트롤 하는 함수
  const handleSelectBook = (item: BookItem | null) => {
    setSelectBook(item);
  };

  // 선택된 책 초기화 함수
  const handleChangeBook = () => {
    setSelectBook(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        mt: 4,
      }}
    >
      <CommonTitle value="독서기록 작성하기" />
      <CommonTypography
        value="먼저 완독 도서 리스트 중 기록을 작성할 도서를 선택해주세요"
        variant="body2"
        bold={true}
      />
      {/* 완독 도서 리스트 */}
      {selectBook === null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
            borderRadius: 3,
            backgroundColor: "primary.main",
            mt: 2,
            overflowY: "auto",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* 도서 아이템 */}
          {userLibrary.map((bookItem) =>
            bookItem.bookState === "complete" ? (
              <WritePostBookItem
                key={bookItem.bookId}
                handleSelectBook={handleSelectBook}
                book={bookItem}
              />
            ) : (
              <></>
            ),
          )}
        </Box>
      )}
      {/* 독서기록 작성 폼 */}
      {selectBook && (
        <WritePostForm handleChangeBook={handleChangeBook} book={selectBook} />
      )}
    </Box>
  );
};

export default WritePage;
