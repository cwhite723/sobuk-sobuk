import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMember, setToken } from "store/auth";
import { useNavigate } from "react-router-dom";
import CommonSnackBar from "components/common/CommonSnackBar";
import { useMutation, useQuery } from "react-query";
import { getMyPage, postLogIn } from "apis/members";
import { RootState } from "store/store";
import CommonTitle from "components/common/CommonTitle";
import CommonFormHelperText from "components/common/CommonFormHelperText";

interface FormValue {
  id: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // 스낵바 상태값
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);

  // react hook form
  const { control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
    },
    // mode를 설정하여 해당 mode에 검증 로직이 동작하도록 함
    mode: "onChange",
  });

  // react-query - post log-in
  const { mutate, isError } = useMutation(postLogIn, {
    onSuccess: (data) => {
      // 로그인 성공 시, 받아온 받아온 토큰을 redux에 저장
      dispatch(setToken(data.headers.authorization));
    },
    onError: (error) => {
      // 로그인 실패 시, 로그인 실패 SnackBar를 보여줌
      setErrorSnackBarOpen(true);
      console.log(error);
    },
  });

  // react-query - get myInfo
  const { data: myPage } = useQuery(
    ["getMyPage", token],
    () => getMyPage(token),
    {
      onSuccess(data) {
        if (data) {
          dispatch(setMember(data.data));
          // 메인으로 이동
          navigate("../main");
        }
      },
      onError(error) {
        console.log("getMyPage Error", error);
      },
      enabled: !!token,
    },
  );

  // 로그인 동작 함수
  const handleLogin = async (formData: FormValue) => {
    await mutate({ userName: formData.id, password: formData.password });
  };

  const handleSnackBarClose = () => {
    setErrorSnackBarOpen(false);
  };

  // 카카오 로그인 버튼 함수
  const handleKakaoLogin = () => {
    console.log("kakao login");
  };

  // 구글 로그인 버튼 함수
  const handleGoogleLogin = () => {
    console.log("google login");
  };

  // 검증 로직에 따른 에러 메세지 표시
  // useEffect(() => {
  //   if (formState.errors.id) {
  //     setErrorMessage("ID는 영문과 숫자만 입력가능합니다.(2~15자)");
  //   } else if (formState.errors.password) {
  //     setErrorMessage(
  //       "Password는 영문과 숫자, 특수문자만 입력가능합니다.(6~15자)",
  //     );
  //   } else {
  //     setErrorMessage("");
  //   }
  // }, [formState]);

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
