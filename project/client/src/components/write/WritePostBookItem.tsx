import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";

type PropsType = {
  handleSelectBook: (item: BookItem | null) => void;
  book: BookItem;
};

const WritePostBookItem: React.FC<PropsType> = (props) => {
  return (
    <Box
      key={props.book.bookId}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CommonTypography
          value={props.book.bookName}
          variant="body1"
          bold={true}
        />
        <CommonTypography
          value={props.book.bookWriter}
          variant="body1"
          bold={false}
        />
        <CommonTypography
          value={props.book.bookPublish}
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
            props.handleSelectBook(props.book);
          }}
        />
      </Box>
    </Box>
  );
};

export default WritePostBookItem;
