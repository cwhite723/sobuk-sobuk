import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import MainBookEditDialog from "./MainBookEditDialog";

const MainSerarchReasult = () => {
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
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MainBookEditDialog isOpen={true} type="read" />

      {bookList.map((item) => (
        <Box
          key={item.bookId}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
            p: 2,
            "&:nth-child(odd)": {
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
            <CommonButton value="📕직접 추가하기" />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "end", md: "center" },
              }}
            >
              <CommonButton value="📖읽기" />
              <CommonButton value="📌찜하기" />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MainSerarchReasult;
