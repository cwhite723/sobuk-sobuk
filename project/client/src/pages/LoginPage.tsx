import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

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
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CommonLink to="../main">
          <CommonTypography value="🏠HOME" variant="body1" bold={true} />
        </CommonLink>
      </Box>
      <CommonTextField
        type="required"
        id="user-id"
        label="아이디"
        placeholder="아이디를 입력하세요."
      />
      <CommonTextField
        type="password"
        id="user-password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
      />
      <CommonBigButton value="로그인" />
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
      <CommonBigButton value="카카오로 로그인" />
      <CommonBigButton value="구글로 로그인" />
    </Box>
  );
};

export default LoginPage;
