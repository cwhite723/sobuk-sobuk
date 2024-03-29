import { Box } from "@mui/material";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  postId: number;
  commentCount: number;
  likeCount: number;
}

const PostCardReaction = ({ postId, commentCount, likeCount }: PropsType) => {
  return (
    <CustomLink to={"../post/" + postId}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <CustomTypography
          text={"📄" + commentCount}
          variant="body2"
          bold={true}
        />
        <CustomTypography text={"✨" + likeCount} variant="body2" bold={true} />
      </Box>
    </CustomLink>
  );
};
export default PostCardReaction;
