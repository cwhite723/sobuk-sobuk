import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

const FeedPostCardInfo = () => {
  return (
    <CommonLink to="../post/1">
      <Box
        sx={{
          display: "flex",
          backgroundColor: "background.default",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
          my: 2,
          py: 2,
        }}
      >
        <CommonBookImage width={100} height={150} />
        <Box>
          <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
            <CommonTypography value="책 제목" variant="h6" bold={true} />
            <CommonTypography value="저자" variant="body2" bold={true} />
          </Box>
          <Box>
            <CommonTypography value="제목" variant="body2" bold={true} />
            <CommonTypography
              value="내용 미리보기"
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardInfo;
