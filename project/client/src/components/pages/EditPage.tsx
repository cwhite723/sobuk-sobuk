import { Box, Input } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import BookImage from "components/atoms/BookImage";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import usePostEditMutation from "hooks/mutates/posts/usePostEditMutation";
import useImageMutation from "hooks/mutates/useImageMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface FormValue {
  postTitle: string;
  postContents: string;
  imageUrl: string;
}

const EditPage = () => {
  const navigate = useNavigate();
  const memberToken = getStoredToken();

  // 기존 포스트 수정을 위해 url에서 postid를 가져옴
  const { postid } = useParams() as { postid: string };
  const postId = parseInt(postid, 10);

  // 스낵바 상태값
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  // 이미지 상태값
  const [postImg, setPostImg] = useState("");

  // react hook form
  const { control, handleSubmit, formState, setValue } = useForm<FormValue>({
    defaultValues: {
      postTitle: "",
      postContents: "",
      imageUrl: "",
    },
    mode: "onSubmit",
  });

  // react-query - PATCH post
  const { mutate: postEditMutate } = usePostEditMutation();

  // react-query - POST image
  const { mutate: imageMutate } = useImageMutation();

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 유저에게 보여주기 위한 state
      setPostImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("imageUrl", data);
        },
      });
    }
  };

  // 포스트(독서기록) 수정 완료 함수
  const handleSubmitPost = (data: FormValue) => {
    postEditMutate(
      {
        postId: postId,
        data: {
          title: data.postTitle,
          content: data.postContents,
        },
        accessToken: memberToken,
      },
      {
        onSuccess: (data) => {
          setSuccessSnackBarOpen(true);
          navigate("../post/" + data.data);
        },
      },
    );
  };

  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        mt: 4,
      }}
    >
      <Box sx={{ mt: 4 }}>
        <CustomSnackBar
          text="포스트 작성이 완료되었습니다."
          severity="success"
          open={successSnackBarOpen}
          handleSnackBarClose={handleSnackBarClose}
        />

        {/* 포스트(독서기록) 작성 폼 */}
        <form>
          <CustomTextField
            name="postTitle"
            control={control}
            rules={{
              required: { value: true, message: "제목은 꼭 입력해주세요." },
            }}
            textFieldProps={{
              id: "post-title",
              label: "독서기록 제목",
              placeholder: "제목을 입력하세요",
            }}
          />
          <HelperText text={formState.errors.postTitle?.message} />

          <CustomTextField
            name="postContents"
            control={control}
            rules={{
              required: { value: true, message: "내용은 꼭 입력해주세요." },
            }}
            textFieldProps={{
              id: "post-contents",
              label: "독서기록 내용",
              placeholder: "내용을 입력하세요",
              rows: "10",
              multiline: true,
            }}
          />
          <HelperText text={formState.errors.postContents?.message} />

          {/* 포스트 사진 업로드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <BookImage width={100} height={150} src={postImg} />
            <Input type="file" onChange={handleChangeImg} name="imageUrl" />
            {!postImg && (
              <HelperText text="대표 이미지를 등록해보세요." status="success" />
            )}
          </Box>

          <BigButton
            text="수정 완료"
            handleClickEvent={handleSubmit(handleSubmitPost)}
          />
        </form>
      </Box>
    </Box>
  );
};

export default EditPage;
