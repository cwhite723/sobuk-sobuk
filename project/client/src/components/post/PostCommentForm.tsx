import { Box } from "@mui/material";
import { postComment } from "apis/comments";
import CommonBigButton from "components/common/CommonBigButton";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";

interface PropsType {
  postId: number;
}

interface FormValue {
  comment: string;
}

const PostCommentForm = (props: PropsType) => {
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // 스낵바 상태값
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      comment: "",
    },
  });

  // react-query - POST comment
  const { mutate, isError } = useMutation(postComment, {
    onSuccess: () => {
      // 성공
      setSnackBarOpen(true);
    },
    onError: (error) => {
      console.log("isError:" + isError, error);
    },
  });

  // 댓글 작성 완료 버튼 함수
  const handleSubmitComment = (data: FormValue) => {
    mutate({
      postId: props.postId,
      data: {
        content: data.comment,
      },
      accessToken: token,
    });
  };

  const handleClose = () => {
    setSnackBarOpen(false);
    navigate("../post/" + props.postId);
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
        <CommonSnackBar
          value="댓글 작성이 완료되었습니다."
          severity="success"
          open={snackBarOpen}
          handleClose={handleClose}
        />
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
