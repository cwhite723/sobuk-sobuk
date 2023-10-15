import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

const FeedPostCardInfo = () => {
  return (
    <CommonLink to="../post/1">
      <Box sx={{ display: "flex" }}>
        <CommonBookImage width={100} height={150} />
        <Box>
          <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
            <CommonTypography value="책 제목" variant="h6" bold={true} />
            <CommonTypography value="저자" variant="body2" bold={false} />
          </Box>
          <Box>
            <CommonTypography value="제목" variant="body2" bold={false} />
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
