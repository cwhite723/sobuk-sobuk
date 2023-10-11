import { Box } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";

const JoinPage = () => {
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
      <CommonTextField
        type="password"
        id="user-password-check"
        label="비밀번호 확인"
        defaultValue="비밀번호를 입력하세요"
      />
      <CommonTextField
        type="required"
        id="user-name"
        label="닉네임"
        defaultValue="닉네임을 입력하세요."
      />
      <CommonTextField
        type="required"
        id="user-email"
        label="이메일"
        defaultValue="이메일을 입력하세요."
      />
      <CommonTextField
        type="required"
        id="user-introduce"
        label="자기소개"
        defaultValue="소개글을 입력하세요."
      />
      <Box
        sx={{
          border: "1px solid",
          borderRadius: "50px",
          marginTop: "25px",
          maxWidth: "100px",
          height: "100px",
          alignSelf: "center",
        }}
      >
        사진 미리보기
      </Box>
      <CommonBigButton value="프로필 사진 업로드" />
      <CommonBigButton value="회원가입" />
    </Box>
  );
};
export default JoinPage;
