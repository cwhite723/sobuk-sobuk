import { getStoredMember, getStoredToken } from "utils/get";
import Grid from "@mui/system/Unstable_Grid";
import BookImage from "components/atoms/BookImage";
import SmallButton from "components/atoms/SmallButton";
import { Box } from "@mui/material";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import { useChallengeParticipate } from "hooks/mutates/useChallengeMutation";
import { useNavigate } from "react-router-dom";

interface PropsType {
  challengeItem: ChallengeInfo;
}

const ChallengeCard = ({ challengeItem }: PropsType) => {
  const navigate = useNavigate();

  // 현재 로그인 유저
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  const { mutate: challengeParticipateMutate } = useChallengeParticipate();

  const handleClickEvent = () => {
    challengeParticipateMutate(
      {
        challengeId: challengeItem.challengeId,
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          navigate("../challenge");
        },
      },
    );
  };

  return (
    <Grid xs="auto" md={5} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
          p: 3,
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <BookImage src={challengeItem.bookImage} width={130} height={180} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomLink to={"../challenge/" + challengeItem.challengeId}>
            <CustomTypography
              text={challengeItem.bookTitle}
              variant="h6"
              bold={true}
            />
          </CustomLink>
          {challengeItem.hostNickname !== memberInfo?.nickname && (
            <SmallButton
              buttonText="참여하기"
              outline={false}
              handleClickEvent={handleClickEvent}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", mt: 2 }}>
          <CustomTypography
            text="인원"
            variant="body2"
            bold={true}
            typographyProps={{ mr: 1 }}
          />
          <CustomTypography
            text={challengeItem.countParticipant + "명"}
            variant="body2"
            bold={false}
            typographyProps={{ mr: 2 }}
          />
          <CustomTypography
            text="달성률"
            variant="body2"
            bold={true}
            typographyProps={{ mr: 1 }}
          />
          <CustomTypography
            text={challengeItem.successRate + "%"}
            variant="body2"
            bold={false}
            typographyProps={{ mr: 2 }}
          />
          <CustomTypography
            text="시작일"
            variant="body2"
            bold={true}
            typographyProps={{ mr: 1 }}
          />
          <CustomTypography
            text={challengeItem.startDate}
            variant="body2"
            bold={false}
            typographyProps={{ mr: 2 }}
          />
        </Box>

        <CustomTypography
          text={challengeItem.content}
          variant="body2"
          bold={true}
          typographyProps={{ mt: 2 }}
        />
        <CustomTypography
          text={challengeItem.genre}
          variant="body2"
          bold={true}
          typographyProps={{ mt: 2 }}
        />
      </Box>
    </Grid>
  );
};

export default ChallengeCard;
