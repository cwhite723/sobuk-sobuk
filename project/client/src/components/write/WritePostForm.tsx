import { Box } from "@mui/material";
import { getBook } from "apis/books";
import { postPost } from "apis/posts";
import CommonBigButton from "components/common/CommonBigButton";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";

interface PropsType {
  handleChangeBook: (bookId: number | null) => void;
  bookId: number;
}

interface FormValue {
  postTitle: string;
  postContents: string;
}

const WritePostForm = (props: PropsType) => {
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // 스낵바 상태값
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // react-query 책 정보
  const { data: bookInfo } = useQuery(
    ["getBook", props.bookId],
    () => getBook(props.bookId),
    {
      enabled: !!props.bookId,
    },
  );

  // react-query - POST post
  const { mutate, isError } = useMutation(postPost, {
    onSuccess: () => {
      // 성공
      setSnackBarOpen(true);
    },
    onError: (error) => {
      console.log("isError:" + isError, error);
    },
  });

  // react hook form
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      postTitle: "",
      postContents: "",
    },
  });

  // 포스트(독서기록) 작성 완료 함수
  const handleSubmitPost = (data: FormValue) => {
    mutate({
      data: {
        bookId: props.bookId,
        title: data.postTitle,
        content: data.postContents,
      },
      accessToken: token,
    });
  };

  const handleClose = () => {
    setSnackBarOpen(false);
    navigate("../feed");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <CommonSnackBar
        value="포스트 작성이 완료되었습니다."
        severity="success"
        open={snackBarOpen}
        handleClose={handleClose}
      />
      {/* 선택된 책 정보 */}
      {bookInfo && (
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <CommonTypography
            value={"👉" + bookInfo.title}
            variant="h5"
            bold={true}
          />
          <CommonTypography
            value={bookInfo.author}
            variant="body1"
            bold={true}
          />
        </Box>
      )}

      {/* 포스트(독서기록) 작성 폼 */}
      <form>
        <CommonTextField
          name="postTitle"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "post-title",
            label: "Post Title",
            placeholder: "제목을 입력하세요",
          }}
        />
        <CommonTextField
          name="postContents"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "post-contents",
            label: "Post Contents",
            placeholder: "내용을 입력하세요",
            rows: "10",
            multiline: true,
          }}
        />
        <CommonBigButton
          value="작성 완료"
          onClick={handleSubmit(handleSubmitPost)}
        />
      </form>
      <CommonBigButton
        value="다른 책 선택하기"
        onClick={() => {
          props.handleChangeBook(null);
        }}
      />
    </Box>
  );
};
export default WritePostForm;
