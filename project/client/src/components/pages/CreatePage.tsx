import { Box } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import SearchBar from "components/blocks/SearchBar";
import { useChallengeCreate } from "hooks/mutates/useChallengeMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface FormValue {
  startDate: string;
  endDate: string;
  recruitCount: number;
  content: string;
}

const CreatePage = () => {
  // 검색 기능 구현 필요
  const navigate = useNavigate();

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  const [keyword, setKeyword] = useState("");

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
      startDate: "",
      endDate: "",
      recruitCount: 0,
      content: "",
    },
    mode: "onChange",
  });

  const { mutate: challengeCreateMutate } = useChallengeCreate();

  const handleCreate = (data: FormValue) => {
    challengeCreateMutate(
      {
        bookId: 1,
        data,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
        my: 4,
      }}
    >
      <form>
        <CustomTypography variant="h5" text="챌린지 생성" bold={true} />
        <CustomTypography variant="h6" text="도서 검색" bold={true} />
        <SearchBar setSearchQuery={setKeyword} />

        <CustomTextField
          name="startDate"
          control={control}
          textFieldProps={{
            type: "date",
            id: "start-date",
            label: "챌린지 시작",
          }}
        />
        <CustomTextField
          name="endDate"
          control={control}
          textFieldProps={{
            type: "date",
            id: "end-date",
            label: "챌린지 종료",
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
          text="챌린지 생성"
          handleClickEvent={handleSubmit(handleCreate)}
        />

        {/* 취소 버튼 */}
        <BigButton
          text="취소"
          handleClickEvent={() => navigate("../challenge")}
          disabled={true}
        />
      </form>
    </Box>
  );
};

export default CreatePage;
