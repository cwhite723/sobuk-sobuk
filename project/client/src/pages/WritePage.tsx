import { Box, TextField } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonButton from "components/common/CommonButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
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

  const handleSubmitPost = () => {
    console.log("submit post");
  };

  const handleSelectBook = (item: BookItem) => {
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
      {selectBook === null ? (
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
            <Box
              key={item.bookId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                "&:not(:last-of-type)": {
                  borderBottom: "1px solid",
                },
                "&:nth-of-type(odd)": {
                  backgroundColor: "primary.light",
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "end", md: "center" },
                }}
              >
                <CommonButton
                  value="✔선택하기"
                  outline={false}
                  onClick={() => {
                    handleSelectBook(item);
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <></>
      )}
      {/* 독서기록 작성 form */}
      {selectBook && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <CommonTypography
              value={"👉" + selectBook.bookName}
              variant="h5"
              bold={true}
            />
            <CommonTypography
              value={selectBook.writer}
              variant="body1"
              bold={true}
            />
          </Box>
          <CommonTextField
            id="post-title"
            label="Post Title"
            type="required"
            placeholder="제목을 입력하세요"
          />
          <TextField
            id="post-contents"
            label="Post Contents"
            type="required"
            placeholder="내용을 입력하세요"
            multiline
            fullWidth
            rows={10}
            sx={{ mt: 2 }}
          />
          <CommonBigButton value="작성 완료" onClick={handleSubmitPost} />
          <CommonBigButton
            value="다른 책 선택하기"
            onClick={handleChangeBook}
          />
        </Box>
      )}
    </Box>
  );
};

export default WritePage;
