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
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        my: 2,
      }}
    >
      <CommonBookImage width={100} height={150} src={src} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CommonTypography text={bookTitle} variant="h6" bold={true} />
        <CommonTypography
          text={"📝" + bookAuthor}
          variant="body2"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default PostBookInfo;
