import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";
import CommonUserProfile from "components/common/CommonUserProfile";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const UserIntroProfile = () => {
  const storedUserInfo = useSelector((state: RootState) => state.user.value);

  // 유저 프로필 section
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        borderRadius: 5,
        boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        p: 4,
        mt: 4,
      }}
    >
      {/* 유저 정보 및 팔로우 버튼 */}
      <CommonUserProfile userInfo={storedUserInfo} avatarSize={80} />

      {/* 자기소개 영역 */}
      <Box
        sx={{
          mt: 4,
          backgroundColor: "background.default",
          borderRadius: 5,
          p: 3,
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
