import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";

interface BookItem {
  bookId: number;
  bookName: string;
  writer: string;
  publish: string;
}

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
          value={props.book.bookName}
          variant="body1"
          bold={true}
        />
        <CommonTypography
          value={props.book.writer}
          variant="body1"
          bold={false}
        />
        <CommonTypography
          value={props.book.publish}
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
