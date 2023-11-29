import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTitle from "components/common/CommonTitle";
import CommonFormHelperText from "components/common/CommonFormHelperText";
import useMyPageQuery from "hooks/queries/members/useMyPageQuery";
import useLogInMutation from "hooks/mutates/members/useLogInMutation";
import { getStoredToken } from "utils/get";
import { setMember } from "store/auth";

interface FormValue {
  id: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const memberToken = getStoredToken();

  // 스낵바 상태값
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);

  // react hook form
  const { control, handleSubmit, formState, reset } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
    },
    // mode를 설정하여 해당 mode에 검증 로직이 동작하도록 함
    mode: "onSubmit",
  });

  // react-query - post log-in
  const { mutate: logInMutate, isSuccess: isLogInSuccess } = useLogInMutation();

  // react-query - get myInfo
  const { data: myPage, isSuccess: isMyPageSuccess } = useMyPageQuery(
    memberToken,
    {
      enabled: !!memberToken,
    },
  );

  // 로그인 동작 함수
  const handleLogin = (formData: FormValue) => {
    logInMutate(
      { userName: formData.id, password: formData.password },
      {
        onError: () => {
          setErrorSnackBarOpen(true);
        },
      },
    );
  };

  const handleSnackBarClose = () => {
    setErrorSnackBarOpen(false);
    reset();
  };

  // 카카오 로그인 버튼 함수
  const handleKakaoLogin = () => {
    console.log("kakao login");
  };

  // 구글 로그인 버튼 함수
  const handleGoogleLogin = () => {
    console.log("google login");
  };

  useEffect(() => {
    // get myInfo 성공시
    if (isLogInSuccess && isMyPageSuccess && myPage) {
      console.log("성공", myPage.data);
      dispatch(setMember(myPage.data));
    }
  }, [isLogInSuccess, isMyPageSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
      }}
    >
      {/* 구경하기 버튼 */}
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CommonLink to="../search">
          <CommonTypography text="🔍구경하기" variant="body1" bold={true} />
        </CommonLink>
      </Box>

      {/* 로그인 실패 */}
      <CommonSnackBar
        text="아이디 또는 비밀번호가 틀립니다."
        severity="error"
        open={errorSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 로그인 폼 */}
      <form>
        <CommonTitle text="로그인" />
        {/* 아이디 입력 */}
        <CommonTextField
          name="id"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]{2,15}$/,
              message: "아이디는 영문과 숫자만 입력가능합니다.(2~15자)",
            },
          }}
          textFieldProps={{
            id: "user-id",
            label: "아이디",
            placeholder: "아이디를 입력하세요.",
          }}
        />
        <CommonFormHelperText text={formState.errors.id?.message} />

        {/* 비밀번호 입력 */}
        <CommonTextField
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
              message:
                "비밀번호는 영문과 숫자, 특수문자를 포함해야 합니다.(6~15자)",
            },
          }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonFormHelperText text={formState.errors.password?.message} />

        <CommonBigButton
          buttonText="로그인"
          handleClickEvent={handleSubmit(handleLogin)}
        />
      </form>

      {/* 회원가입, 아이디/비밀번호 찾기 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          borderBottom: "1px solid",
          paddingBottom: "25px",
        }}
      >
        <CommonLink to="../join">
          <CommonTypography text="👋회원가입" variant="body2" bold={false} />
        </CommonLink>
        <CommonLink to="#">
          <CommonTypography
            text="🔍아이디/비밀번호찾기"
            variant="body2"
            bold={false}
          />
        </CommonLink>
      </Box>

      {/* 소셜 로그인 */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <CommonBigButton
          buttonText="카카오로 로그인"
          handleClickEvent={handleKakaoLogin}
        />
        <CommonBigButton
          buttonText="구글로 로그인"
          handleClickEvent={handleGoogleLogin}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
