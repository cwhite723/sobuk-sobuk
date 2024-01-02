import { Box } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import { useCommentSubmit } from "hooks/mutates/useCommentMutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface PropsType {
  postId: number;
}

interface FormValue {
  comment: string;
}

const CommentForm = ({ postId }: PropsType) => {
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // 스낵바 상태값
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<FormValue>({
    defaultValues: {
      comment: "",
    },
    mode: "onSubmit",
  });

  // react-query - POST comment
  const { mutate: submitMutate } = useCommentSubmit();

  // 댓글 작성 완료 버튼 함수
  const handleSubmitComment = (data: FormValue) => {
    submitMutate(
      {
        postId: postId,
        data: {
          content: data.comment,
        },
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          reset();
          setSnackBarOpen(true);
        },
      },
    );
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    navigate("../post/" + postId);
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
        <CustomSnackBar
          text="댓글 작성이 완료되었습니다."
          severity="success"
          open={snackBarOpen}
          handleSnackBarClose={handleSnackBarClose}
        />

        <CustomTextField
          name="comment"
          control={control}
          rules={{
            required: { value: true, message: "내용은 꼭 입력해주세요." },
          }}
          textFieldProps={{
            id: "comment",
            label: "댓글",
            placeholder: "댓글 내용을 입력하세요",
          }}
        />
        <HelperText text={formState.errors.comment?.message} />

        <BigButton
          text="입력"
          handleClickEvent={handleSubmit(handleSubmitComment)}
        />
      </Box>
    </form>
  );
};

export default CommentForm;
