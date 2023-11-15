import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FeedPostCardInfo from "./FeedPostCardInfo";
import FeedPostCardReaction from "./FeedPostCardReaction";
import CommonUserProfile from "components/common/CommonUserProfile";

interface PropsType {
  postItem: PostItem;
}

const FeedPostCard: React.FC<PropsType> = (props) => {
  return (
    <Grid xs="auto" md={5} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
          p: 3,
        }}
      >
        {/* user profile */}
        <CommonUserProfile
          memberInfo={props.postItem.postOwner}
          avatarSize={50}
        />

        {/* 책, 게시글 정보 영역 */}
        <FeedPostCardInfo postItem={props.postItem} />

        {/* 댓글 및 추천수 */}
        <FeedPostCardReaction
          postId={props.postItem.postId}
          commentCount={props.postItem.postCommentsCount}
          likeCount={props.postItem.postLikeCount}
        />
      </Box>
    </Grid>
  );
};
export default FeedPostCard;