import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";

const FeedOptionMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <CommonTypography value="최신순" variant="body2" bold={true} />
      <CommonTypography value="댓글순" variant="body2" bold={false} />
      <CommonTypography value="추천순" variant="body2" bold={false} />
    </Box>
  );
};

export default FeedOptionMenu;
