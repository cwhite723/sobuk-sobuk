import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import MainBookEditDialog from "./MainBookEditDialog";
import React from "react";

// 검색된 책 리스트 더미 데이터
const bookList = [
  { bookId: 1, bookName: "책 제목1", writer: "저자1", publish: "출판사1" },
  { bookId: 2, bookName: "책 제목2", writer: "저자2", publish: "출판사2" },
  { bookId: 3, bookName: "책 제목3", writer: "저자3", publish: "출판사3" },
  {
    bookId: "no-result",
    bookName: "찾는 책이 없어요",
    writer: "",
    publish: "",
  },
];

const MainSerarchReasult = () => {
  // Dialog open 여부
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  // Dialog 타입 관리
  const [dialogType, setDialogType] = React.useState<"read" | "add" | "edit">(
    "read",
  );

  // 책 추가하기
  const handleAddBook = () => {
    setOpenDialog(true);
    setDialogType("add");
  };

  // 책 읽기
  const handleReadBook = () => {
    setOpenDialog(true);
    setDialogType("read");
  };

  // 책 찜하기
  const handleBookMark = () => {
    console.log("책 찜하기");
  };

  // Dialog 닫기
  const handleClose = (): boolean => {
    setOpenDialog(false);
    return false;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MainBookEditDialog
        isOpen={openDialog}
        type={dialogType}
        handleClose={handleClose}
      />

      {/* 검색된 도서 리스트 */}
      {bookList.map((item) => (
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
              value={item.writer}
              variant="body1"
              bold={false}
            />
            <CommonTypography
              value={item.publish}
              variant="body1"
              bold={false}
            />
          </Box>
          {item.bookId === "no-result" ? (
            <CommonButton
              value="📕직접 추가하기"
              outline={false}
              onClick={handleAddBook}
            />
          ) : (
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
                onClick={handleReadBook}
              />
              <CommonButton
                value="📌찜하기"
                outline={false}
                onClick={handleBookMark}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MainSerarchReasult;
