import { Box } from "@mui/material";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import WritePostBookItem from "components/write/WritePostBookItem";
import WritePostForm from "components/write/WritePostForm";
import React from "react";

interface BookItem {
  bookId: number;
  bookName: string;
  writer: string;
  publish: string;
}

const WritePage = () => {
  const [selectBook, setSelectBook] = React.useState<BookItem | null>(null);

  const bookList = [
    { bookId: 1, bookName: "책 제목1", writer: "저자1", publish: "출판사1" },
    { bookId: 2, bookName: "책 제목2", writer: "저자2", publish: "출판사2" },
    { bookId: 3, bookName: "책 제목3", writer: "저자3", publish: "출판사3" },
    { bookId: 4, bookName: "책 제목4", writer: "저자4", publish: "출판사4" },
    { bookId: 5, bookName: "책 제목5", writer: "저자5", publish: "출판사5" },
  ];

  const handleSelectBook = (item: BookItem | null) => {
    setSelectBook(item);
  };

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
            border: "1px solid",
            borderRadius: 3,
            backgroundColor: "primary.main",
            mt: 2,
            overflowY: "auto",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {bookList.map((item) => (
            <WritePostBookItem
              key={item.bookId}
              handleSelectBook={handleSelectBook}
              book={item}
            />
          ))}
        </Box>
      )}
      {/* 독서기록 작성 form */}
      {selectBook && (
        <WritePostForm handleChangeBook={handleChangeBook} book={selectBook} />
      )}
    </Box>
  );
};

export default WritePage;
