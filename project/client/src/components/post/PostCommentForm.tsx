import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";

const PostCommentForm = () => {
  const handleSubmitComment = () => {
    console.log("SubmitComment");
  };
  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CommonTextField
        id="comment"
        label="comment"
        placeholder="댓글 내용을 입력하세요"
        type="required"
      />
      <CommonBigButton value="입력" onClick={handleSubmitComment} />
    </Box>
  );
};

export default PostCommentForm;
