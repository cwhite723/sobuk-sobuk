import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import { useForm } from "react-hook-form";

interface FormValue {
  comment: string;
}

const PostCommentForm = () => {
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      comment: "",
    },
  });

  // 댓글 작성 완료 버튼 함수
  const handleSubmitComment = () => {
    console.log("SubmitComment");
  };

  return (
    <form>
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
          name="comment"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "comment",
            label: "comment",
            placeholder: "댓글 내용을 입력하세요",
          }}
        />
        <CommonBigButton
          value="입력"
          onClick={handleSubmit(handleSubmitComment)}
        />
      </Box>
    </form>
  );
};

export default PostCommentForm;
