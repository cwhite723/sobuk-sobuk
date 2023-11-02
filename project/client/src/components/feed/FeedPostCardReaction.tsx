import { Box } from "@mui/material";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  postId: number;
  commentCount: number;
  likeCount: number;
}

const FeedPostCardReaction = (props: PropsType) => {
  return (
    <CommonLink to={"../post/" + props.postId}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CommonTypography
          value={"📄" + props.commentCount}
          variant="body2"
          bold={true}
        />
        <CommonTypography
          value={"✨" + props.likeCount}
          variant="body2"
          bold={true}
        />
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardReaction;
