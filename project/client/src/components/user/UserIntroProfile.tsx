import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";
import CommonUserProfile from "components/common/CommonUserProfile";

const UserIntroProfile = () => {
  // 유저 프로필 section
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        borderRadius: 5,
        border: "1px solid",
        p: 2,
      }}
    >
      {/* 유저 정보 및 팔로우 버튼 */}
      <CommonUserProfile userId="userId" userName="userName" avatarSize={80} />

      {/* 자기소개 영역 */}
      <Box
        sx={{
          mt: 2,
          backgroundColor: "background.default",
          borderRadius: 5,
          p: 2,
        }}
      >
        <CommonTypography
          value="소개글이 없습니다😥"
          variant="body1"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default UserIntroProfile;
