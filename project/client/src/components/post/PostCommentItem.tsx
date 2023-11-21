import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  commentItem: CommentResponse;
}

const PostCommentItem = (props: PropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "baseline", md: "center" },
        borderBottom: "1px solid",
        p: 2,
      }}
    >
      {/* 작성자 profile */}
      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 } }}>
        <CommonAvaratImage size={35} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            mx: 1,
            flexShrink: 0,
          }}
        >
          <CommonTypography
            value={props.commentItem.nickname}
            variant="body2"
            bold={true}
          />
          <CommonTypography
            value={props.commentItem.userName}
            variant="body2"
            bold={false}
          />
        </Box>
      </Box>

      {/* 댓글 내용 */}
      <Box sx={{ ml: 1, p: 2 }}>
        <CommonTypography
          value={props.commentItem.content}
          variant="body1"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default PostCommentItem;
