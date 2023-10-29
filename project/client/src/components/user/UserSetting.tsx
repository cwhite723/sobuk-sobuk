import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { editUserInfo } from "store/user";

interface FormValue {
  nickName: string;
  introduce: string;
  img?: string;
}

const UserSetting = () => {
  // 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const dispatch = useDispatch();

  // store 값 가져오기
  const storedUserInfo = useSelector((state: RootState) => state.user.value);

  // react hook form
  const { control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      nickName: storedUserInfo.userName,
      introduce: storedUserInfo.userIntroduction,
      img: storedUserInfo.userImg,
    },
    mode: "onSubmit",
  });

  // 로그인한 유저의 프로필 이미지
  const [profileImg, setProfileImg] = React.useState<string>("");

  // 로그인한 유저의 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 정보 수정 완료 버튼 함수
  const handleSetting = (data: FormValue) => {
    data.img = profileImg;
    dispatch(
      editUserInfo({
        ...storedUserInfo,
        userName: data.nickName,
        userIntroduction: data.introduce,
        userImg: profileImg,
      }),
    );
    setSnackBarOpen(true);
  };

  // 회원탈퇴 버튼 함수
  const handleDropOut = () => {
    localStorage.clear();
    console.log("회원탈퇴");
  };

  const handleClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    if (formState.errors.nickName) {
      setErrorMessage("닉네임은 필수 입력입니다.(2~10자)");
    } else {
      setErrorMessage("");
    }
  }, [formState]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
          m: { xs: 4, md: 6 },
          p: 4,
        }}
      >
        {/* snackbar */}
        <CommonSnackBar
          value="정보수정이 완료되었습니다."
          severity="success"
          open={snackBarOpen}
          handleClose={handleClose}
        />

        <CommonTitle value="😊 계정 정보 수정하기" />

        {/* 프로필 수정 폼 */}
        {/* 프로필 이미지 업데이트 */}
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <CommonAvaratImage size={100} src={profileImg} />
            <Input type="file" onChange={handleChangeImg} />
          </Box>

          <CommonTextField
            name="nickName"
            control={control}
            rules={{ required: true, minLength: 2, maxLength: 10 }}
            textFieldProps={{
              id: "user-name",
              label: "닉네임",
            }}
          />
          <CommonTextField
            name="introduce"
            control={control}
            textFieldProps={{
              id: "user-introduce",
              label: "자기소개",
            }}
          />

          {/* error message */}
          <CommonTypography
            value={errorMessage}
            variant="body2"
            bold={true}
            error={true}
          />

          <CommonBigButton
            value="수정완료"
            onClick={handleSubmit(handleSetting)}
          />
          <CommonBigButton value="회원탈퇴" onClick={handleDropOut} />
        </form>
      </Box>
    </Box>
  );
};

export default UserSetting;
