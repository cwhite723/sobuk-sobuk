import { Box } from "@mui/material";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  postId: number;
  commentCount: number;
  likeCount: number;
}

const FeedPostCardReaction = ({
  postId,
  commentCount,
  likeCount,
}: PropsType) => {
  return (
    <CommonLink to={"../post/" + postId}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CommonTypography
          text={"📄" + commentCount}
          variant="body2"
          bold={true}
        />
        <CommonTypography text={"✨" + likeCount} variant="body2" bold={true} />
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardReaction;
