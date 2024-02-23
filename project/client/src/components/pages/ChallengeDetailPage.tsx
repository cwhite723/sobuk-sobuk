import { Box, Grid } from "@mui/material";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import UserProfile from "components/blocks/UserProfile";

const ChallengeDetailPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.light",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        borderRadius: 5,
        py: { xs: 4, md: 6 },
        px: { xs: 4, md: 6 },
        mt: 4,
        gap: 2,
      }}
    >
      {/* 챌린지 수정 버튼 */}
      {/* 모달로 보여주기 */}
      <CustomTypography text="🚧챌린지 수정" variant="body2" bold={true} />

      <CustomTypography text="챌린지 도서 이름" variant="h5" bold={true} />
      <CustomTypography
        text="#장르 #태그 / 2024.02.24 - 2024.03.24"
        variant="body2"
        bold={false}
      />
      <CustomTypography text="챌린지, 도서 소개" variant="h6" bold={true} />

      <Box>[달성률 그래프 부분]</Box>

      <CustomTypography text="챌린지 참여 인원 목록" variant="h6" bold={true} />

      <Grid>
        <UserProfile memberId={1} avatarSize={50} />
        <UserProfile memberId={1} avatarSize={50} />
        <UserProfile memberId={1} avatarSize={50} />
        <UserProfile memberId={1} avatarSize={50} />
        <UserProfile memberId={1} avatarSize={50} />
      </Grid>
    </Box>
  );
};

export default ChallengeDetailPage;
