import { Box, Grid } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import BookImage from "components/atoms/BookImage";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import SmallButton from "components/atoms/SmallButton";
import UserProfile from "components/blocks/UserProfile";
import {
  useChallengeDelete,
  useChallengeEdit,
} from "hooks/mutates/useChallengeMutation";
import { useChallengeQuery } from "hooks/queries/useChallengeQueries";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";

interface FormValue {
  startDate: string;
  endDate: string;
  recruitCount: number;
  content: string;
}

const ChallengeDetailPage = () => {
  // 챌린지 정보 수정 모달창 상태값
  const [editing, setEditing] = useState<boolean>(false);

  const navigate = useNavigate();

  // 현재 url에서 challengeId 추출
  const { challengeid } = useParams() as { challengeid: string };
  const challengeId = parseInt(challengeid, 10);

  // 현재 로그인 유저
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  // react-query - get challenge 현재 챌린지 정보 요청
  const { data: challengeInfo } = useChallengeQuery(challengeId, memberToken, {
    enabled: !!challengeId && !!memberToken,
  });

  // react-query - Edit challenge
  const { mutate: editMutate } = useChallengeEdit();

  // react-query - Delete challenge
  const { mutate: deleteMutate } = useChallengeDelete();

  // react hook form
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState,
    trigger,
    watch,
  } = useForm<FormValue>({
    defaultValues: {
      startDate: challengeInfo?.data.challengeDetailResponse.startDate,
      endDate: challengeInfo?.data.challengeDetailResponse.endDate,
      recruitCount: 0,
      content: challengeInfo?.data.challengeDetailResponse.content,
    },
    mode: "onChange",
  });

  const handleChallengeEditOpen = () => {
    setEditing(!editing);
  };

  const handleChallengeEdit = (data: FormValue) => {
    editMutate({ challengeId, data, accessToken: memberToken });
  };

  const handleChallengeDelete = () => {
    deleteMutate(
      { challengeId, accessToken: memberToken },
      {
        onSuccess: () => {
          navigate("../challenge");
        },
      },
    );
  };

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
      {/* 챌린지 수정 및 삭제 버튼 */}
      {challengeInfo?.data.challengeDetailResponse.host && (
        <Box>
          <SmallButton
            buttonText="🚧챌린지 수정"
            outline={false}
            handleClickEvent={handleChallengeEditOpen}
          />
          <SmallButton
            buttonText="❌챌린지 삭제"
            outline={false}
            handleClickEvent={handleChallengeDelete}
          />
        </Box>
      )}
      {editing ? (
        <Box>
          {challengeInfo?.data && (
            <form>
              <CustomTypography text="챌린지 수정" variant="h6" bold={true} />
              <CustomTextField
                name="startDate"
                control={control}
                textFieldProps={{
                  type: "date",
                  id: "start-date",
                  label: "챌린지 시작",
                  "aria-readonly": true,
                }}
              />
              <CustomTextField
                name="endDate"
                control={control}
                textFieldProps={{
                  type: "date",
                  id: "end-date",
                  label: "챌린지 종료",
                  "aria-readonly": true,
                }}
              />
              <CustomTextField
                name="recruitCount"
                control={control}
                textFieldProps={{
                  type: "number",
                  id: "challenge-persons",
                  label: "챌린지 인원",
                  placeholder: "인원을 설정하세요",
                }}
              />
              <CustomTextField
                name="content"
                control={control}
                textFieldProps={{
                  type: "text",
                  id: "challenge-intro",
                  label: "챌린지 소개",
                  placeholder: "소개를 입력하세요",
                }}
              />

              <BigButton
                text="수정 완료"
                handleClickEvent={handleSubmit(handleChallengeEdit)}
              />
              {/* 취소 버튼 */}
              <BigButton
                text="취소"
                handleClickEvent={handleChallengeEditOpen}
                disabled={true}
              />
            </form>
          )}
        </Box>
      ) : (
        <Box>
          <BookImage
            src={challengeInfo?.data.challengeDetailResponse.bookImage}
            width={150}
            height={200}
          />
          <CustomTypography
            text={"" + challengeInfo?.data.challengeDetailResponse.bookTitle}
            variant="h5"
            bold={true}
          />
          <CustomTypography
            text={
              challengeInfo?.data.challengeDetailResponse.genre +
              " / " +
              challengeInfo?.data.challengeDetailResponse.startDate +
              " - " +
              challengeInfo?.data.challengeDetailResponse.endDate
            }
            variant="body2"
            bold={false}
          />
          <CustomTypography
            text={
              "챌린지 소개 : " +
              challengeInfo?.data.challengeDetailResponse.content
            }
            variant="h6"
            bold={true}
          />
          {/* 달성률 그래프 수정 필요 */}
          <Box>[달성률 그래프 부분]</Box>
        </Box>
      )}

      <CustomTypography text="챌린지 참여 인원 목록" variant="h6" bold={true} />

      {/* 호스트 표시 추가 필요 */}
      <Grid>
        {challengeInfo &&
          challengeInfo?.data.challengeMemberInfoList.map((memberItem) => (
            <UserProfile
              key={memberItem.id}
              memberId={
                memberItem.nickname === memberInfo?.nickname
                  ? null
                  : memberItem.id
              }
              avatarSize={50}
            />
          ))}
      </Grid>
    </Box>
  );
};

export default ChallengeDetailPage;
