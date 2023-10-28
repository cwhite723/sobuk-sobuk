import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";

interface FormValue {
  id: string;
  password: string;
}

const LoginPage = () => {
  // react hook form
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  // 로그인 버튼 함수
  const handleLogin = (data: FormValue) => {
    localStorage.setItem("id", data.id);
    location.reload();
  };

  // 카카오 로그인 버튼 함수
  const handleKakaoLogin = () => {
    console.log("kakao login");
  };

  // 구글 로그인 버튼 함수
  const handleGoogleLogin = () => {
    console.log("google login");
  };

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
          rules={{ required: true }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonBigButton value="로그인" onClick={handleSubmit(handleLogin)} />
      </form>

      {/* 회원가입, 아이디/비밀번호 찾기 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          textAlign: "right",
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
