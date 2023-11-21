import { Box } from "@mui/material";
import { getBook } from "apis/books";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useQuery } from "react-query";

type PropsType = {
  handleSelectBook: (bookId: number) => void;
  bookId: number;
};

const WritePostBookItem = (props: PropsType) => {
  // react-query 책 정보
  const { data: bookInfo } = useQuery(
    ["getBook", props.bookId],
    () => getBook(props.bookId),
    {
      enabled: !!props.bookId,
    },
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        "&:nth-of-type(odd)": {
          backgroundColor: "primary.light",
        },
      }}
    >
      {bookInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CommonTypography
            value={bookInfo.title}
            variant="body1"
            bold={true}
          />
          <CommonTypography
            value={bookInfo.author}
            variant="body1"
            bold={false}
          />
          <CommonTypography
            value={bookInfo.publisher}
            variant="body1"
            bold={false}
          />
        </Box>
      )}

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
            props.handleSelectBook(props.bookId);
          }}
        />
      </Box>
    </Box>
  );
};

export default WritePostBookItem;
