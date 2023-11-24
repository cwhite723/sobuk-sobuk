import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FeedPostCardInfo from "./FeedPostCardInfo";
import FeedPostCardReaction from "./FeedPostCardReaction";
import CommonUserProfile from "components/common/CommonUserProfile";
import { useQuery } from "react-query";
import { getMember } from "apis/members";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface PropsType {
  postItem: PostInfo;
}

const FeedPostCard = (props: PropsType) => {
  // 현재 로그인 유저
  const token = useSelector((state: RootState) => state.auth.token);

  // react-query - get member
  // 해당 포스트 유저 프로필 get
  const { data } = useQuery(
    ["getMember", props.postItem.memberId, token],
    () => getMember({ memberId: props.postItem.memberId, accessToken: token }),
    {
      enabled: !!props.postItem.memberId && !!token,
    },
  );

  console.log(props.postItem);

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
        {data && (
          <CommonUserProfile
            memberInfo={data.data}
            memberId={props.postItem.memberId}
            avatarSize={50}
          />
        )}

        {/* 책, 게시글 정보 영역 */}
        <FeedPostCardInfo postItem={props.postItem} />

        {/* 댓글 및 추천수 */}
        <FeedPostCardReaction
          postId={props.postItem.postId ? props.postItem.postId : 1}
          commentCount={props.postItem.countComments}
          likeCount={props.postItem.countLikes}
        />
      </Box>
    </Grid>
  );
};
export default FeedPostCard;
