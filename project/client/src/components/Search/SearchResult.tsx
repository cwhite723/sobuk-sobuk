import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import SearchBookReadDialog from "./SearchBookReadDialog";
import SearchBookSubmitDialog from "./SearchBookSubmitDialog";

// 검색된 책 리스트 더미 데이터
const searchList: BookItem[] = [
  {
    bookId: 1,
    bookName: "제목1",
    bookWriter: "작가1",
    bookPublish: "출판사1",
    bookPages: 365,
  },
  {
    bookId: 2,
    bookName: "제목2",
    bookWriter: "작가2",
    bookPublish: "출판사2",
    bookPages: 563,
  },
  {
    bookId: 3,
    bookName: "제목3",
    bookWriter: "작가3",
    bookPublish: "출판사3",
    bookPages: 156,
  },
  {
    bookId: 4,
    bookName: "제목4",
    bookWriter: "작가4",
    bookPublish: "출판사4",
    bookPages: 298,
  },
  {
    bookId: 0,
    bookName: "찾는 책이 없어요",
    bookWriter: "",
    bookPublish: "",
    bookPages: 0,
  },
];

const SerarchReasult = () => {
  // Dialog open 여부
  const [openDialog, setOpenDialog] = useState(false);

  // 책 읽기 mode 선택된 도서
  const [selectedBook, setSelectedBook] = useState<BookItem>();

  // 책 추가하기 mode
  const [submitBook, setSubmitBook] = useState(false);

  // 책 추가하기
  const handleAddBook = () => {
    setSubmitBook(true);
    setOpenDialog(true);
  };

  // 책 읽기
  const handleReadBook = (book: BookItem) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  // 책 찜하기
  const handleBookMark = () => {
    console.log("책 찜하기");
  };

  // Dialog 닫기
  const handleClose = () => {
    setSelectedBook(undefined);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {submitBook && (
        <SearchBookSubmitDialog isOpen={openDialog} handleClose={handleClose} />
      )}

      {selectedBook && (
        <SearchBookReadDialog
          isOpen={openDialog}
          handleClose={handleClose}
          selectedBook={selectedBook}
        />
      )}

      {/* 검색된 도서 리스트 */}
      {searchList.map((item) => (
        <Box
          key={item.bookId}
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
              value={item.bookName}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={item.bookWriter}
              variant="body1"
              bold={false}
            />
            <CommonTypography
              value={item.bookPublish}
              variant="body1"
              bold={false}
            />
          </Box>
          {item.bookId !== 0 ? (
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
                onClick={() => handleReadBook(item)}
              />
              <CommonButton
                value="📌찜하기"
                outline={false}
                onClick={handleBookMark}
              />
            </Box>
          ) : (
            <CommonButton
              value="📕직접 추가하기"
              outline={false}
              onClick={handleAddBook}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SerarchReasult;
