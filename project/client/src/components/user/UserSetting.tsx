import { Alert, Box, CircularProgress, Input } from "@mui/material";
import { deleteMember, getMyPage, patchMember } from "apis/members";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setMember } from "store/auth";
import { RootState } from "store/store";

interface FormValue {
  nickname: string;
  introduction: string;
  img?: string;
}

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  // 스낵바 상태값
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  // 로그인한 유저의 프로필 이미지
  const [profileImg, setProfileImg] = useState("");

  // store 토큰 값 가져오기
  const memberToken = useSelector((state: RootState) => state.auth.token);
  // store 값 가져오기
  const storedMemberInfo: MemberInfo = JSON.parse(
    useSelector((state: RootState) => state.auth.member),
  );

  // react hook form
  const { control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      nickname: storedMemberInfo.nickname,
      introduction: storedMemberInfo.introduction,
      img: "",
    },
    mode: "onSubmit",
  });

  // react-query - get myInfo
  const { data: myPage, refetch } = useQuery(
    ["getMyPage", memberToken],
    () => getMyPage(memberToken),
    {
      onSuccess(data) {
        if (data) {
          // 수정된 데이터로 redux 업데이트
          dispatch(setMember(data.data));
        }
      },
      onError(error) {
        console.log("getMyPage Error", error);
      },
      enabled: !!snackBarOpen,
    },
  );

  // react-query DELETE member
  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
  } = useMutation(deleteMember, {
    onSuccess: () => {
      // 탈퇴 성공
      dispatch(logout());
      navigate("../login");
    },
    onError: (error) => {
      // 탈퇴 실패
      console.log(error);
    },
  });

  // react-query PATCH member
  const {
    mutate: patchMutate,
    isLoading: patchIsLoading,
    isError: patchIsError,
  } = useMutation(patchMember, {
    onSuccess: () => {
      // 수정 성공
      refetch();
      setSnackBarOpen(true);
    },
    onError: (error) => {
      // 수정 실패
      console.log(error);
    },
  });

  // 로그인한 유저의 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 정보 수정 완료 버튼 함수
  const handleSetting = (data: FormValue) => {
    data.img = profileImg;
    patchMutate({
      data: {
        nickname: data.nickname,
        introduction: data.introduction,
      },
      accessToken: memberToken,
    });
  };

  // 회원탈퇴 버튼 함수
  const handleDropOut = () => {
    deleteMutate(memberToken);
  };

  const handleClose = () => {
    setSnackBarOpen(false);
    navigate(0);
  };

  useEffect(() => {
    if (formState.errors.nickname) {
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

        {/* 로딩중 */}
        {deleteIsLoading || (patchIsLoading && <CircularProgress />)}

        {/* 에러발생 */}
        {deleteIsError && (
          <Alert severity="error">회원탈퇴 중 오류가 발생했습니다.</Alert>
        )}
        {patchIsError && (
          <Alert severity="error">회원정보 수정 중 오류가 발생했습니다.</Alert>
        )}

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
            name="nickname"
            control={control}
            rules={{ required: true, minLength: 2, maxLength: 10 }}
            textFieldProps={{
              id: "user-name",
              label: "닉네임",
            }}
          />
          <CommonTextField
            name="introduction"
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
