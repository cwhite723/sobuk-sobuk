import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/user";
import { useNavigate } from "react-router-dom";
import CommonSnackBar from "components/common/CommonSnackBar";

interface FormValue {
  id: string;
  password: string;
}

// 더미데이터
const users: FormValue[] = [
  { id: "test1", password: "123456" },
  { id: "test2", password: "123456" },
  { id: "test3", password: "123456" },
];

const LoginPage = () => {
  // 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // react hook form
  const { control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
    },
    // mode를 설정하여 해당 mode에 검증 로직이 동작하도록 함
    mode: "onChange",
  });

  // 로그인 버튼 함수
  const handleLogin = (data: FormValue) => {
    if (
      users.find(
        (element) =>
          element.id === data.id && element.password === data.password,
      )
    ) {
      // 로그인 성공 로직
      dispatch(
        login({
          token: data.id,
          userId: data.id,
          userName: data.id,
          userImg: "",
          userIntroduction: "안녕하세요",
        }),
      );
      navigate("../main");
    } else {
      // 로그인 실패 로직
      setSnackBarOpen(true);
    }
  };

  const handleClose = () => {
    setSnackBarOpen(false);
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
  useEffect(() => {
    if (formState.errors.id) {
      setErrorMessage("ID를 입력해주세요.");
    } else if (formState.errors.password) {
      setErrorMessage("Password는 6자 이상입니다.");
    } else {
      setErrorMessage("");
    }
  }, [formState]);

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
      {/* HOME 버튼 */}
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CommonLink to="../main">
          <CommonTypography value="🏠HOME" variant="body1" bold={true} />
        </CommonLink>
      </Box>

      {/* snackbar */}
      <CommonSnackBar
        value="아이디 또는 비밀번호가 틀립니다."
        severity="error"
        open={snackBarOpen}
        handleClose={handleClose}
      />

      {/* 로그인 폼 */}
      <form>
        <CommonTextField
          name="id"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "user-id",
            label: "아이디",
            placeholder: "아이디를 입력하세요.",
          }}
        />
        <CommonTextField
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: { value: 6, message: "비밀번호는 6자 이상입니다." },
          }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonTypography
          value={errorMessage}
          variant="body2"
          bold={true}
          error={true}
        />
        <CommonBigButton value="로그인" onClick={handleSubmit(handleLogin)} />
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
          <CommonTypography value="👋회원가입" variant="body2" bold={false} />
        </CommonLink>
        <CommonLink to="#">
          <CommonTypography
            value="🔍아이디/비밀번호찾기"
            variant="body2"
            bold={false}
          />
        </CommonLink>
      </Box>

      {/* 소셜 로그인 */}
      <CommonBigButton value="카카오로 로그인" onClick={handleKakaoLogin} />
      <CommonBigButton value="구글로 로그인" onClick={handleGoogleLogin} />
    </Box>
  );
};

export default LoginPage;
