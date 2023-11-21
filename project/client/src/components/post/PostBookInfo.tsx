import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  bookTitle: string;
  bookAuthor: string;
  src?: string;
}

const PostBookInfo = (props: PropsType) => {
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
      <CommonBookImage width={150} height={180} src={props.src} />
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
          <CommonTypography value={props.bookTitle} variant="h6" bold={true} />
          <CommonTypography
            value={props.bookAuthor}
            variant="body1"
            bold={true}
          />
        </Box>
        {/* <Box sx={{ my: 1 }}>
          <CommonTypography
            value="책 줄거리 한줄 소개"
            variant="body1"
            bold={false}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default PostBookInfo;
