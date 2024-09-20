import { Box } from "@mui/material";
import BookImage from "components/atoms/BookImage";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  bookTitle: string;
  bookAuthor: string;
  src?: string;
}

const BookInfo = ({ bookAuthor, bookTitle, src }: PropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        my: 2,
      }}
    >
      <BookImage width={100} height={150} src={src} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CustomTypography text={bookTitle} variant="h6" bold={true} />
        <CustomTypography
          text={"📝" + bookAuthor}
          variant="body2"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default BookInfo;
