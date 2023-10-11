import { Box, Link, Typography } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";

const LoginPage = () => {
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
      <CommonTextField
        type="required"
        id="user-id"
        label="아이디"
        defaultValue="아이디를 입력하세요."
      />
      <CommonTextField
        type="password"
        id="user-password"
        label="비밀번호"
        defaultValue="비밀번호를 입력하세요"
      />
      <CommonBigButton value="로그인" />
      <Typography
        sx={{
          marginTop: "10px",
          textAlign: "right",
          borderBottom: "1px solid",
          paddingBottom: "25px",
        }}
      >
        <Link href="#" color="text.primary" sx={{ textDecoration: "none" }}>
          회원가입
        </Link>
        {" | "}
        <Link href="#" color="text.primary" sx={{ textDecoration: "none" }}>
          아이디/비밀번호찾기
        </Link>
      </Typography>
      <CommonBigButton value="카카오로 로그인" />
      <CommonBigButton value="구글로 로그인" />
    </Box>
  );
};

export default LoginPage;
