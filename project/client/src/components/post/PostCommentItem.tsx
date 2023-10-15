import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonTypography from "components/common/CommonTypography";

const PostCommentItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "baseline", md: "center" },
        borderBottom: "1px solid",
        p: 1,
      }}
    >
      {/* 작성자 profile */}
      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 } }}>
        <CommonAvaratImage size={35} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            ml: 1,
            flexShrink: 0,
          }}
        >
          <CommonTypography value="닉네임" variant="body2" bold={true} />
          <CommonTypography value="아이디" variant="body2" bold={false} />
        </Box>
      </Box>

      {/* 댓글 내용 */}
      <Box sx={{ ml: 1, p: 1 }}>
        <CommonTypography
          value="댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용"
          variant="body1"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default PostCommentItem;
