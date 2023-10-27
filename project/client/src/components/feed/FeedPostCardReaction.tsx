import { Box } from "@mui/material";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

const FeedPostCardReaction = () => {
  return (
    <CommonLink to="../post/1">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CommonTypography value="📄댓글수" variant="body2" bold={true} />
        <CommonTypography value="✨추천수" variant="body2" bold={true} />
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardReaction;
