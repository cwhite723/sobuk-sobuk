import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  bookTitle: string;
  bookAuthor: string;
  src?: string;
}

const PostBookInfo = ({ bookAuthor, bookTitle, src }: PropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        my: 4,
      }}
    >
      <CommonBookImage width={150} height={180} src={src} />
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "baseline",
            borderBottom: "1px solid",
            mt: 2,
            mr: 2,
          }}
        >
          <CommonTypography text={bookTitle} variant="h6" bold={true} />
          <CommonTypography text={bookAuthor} variant="body1" bold={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostBookInfo;
