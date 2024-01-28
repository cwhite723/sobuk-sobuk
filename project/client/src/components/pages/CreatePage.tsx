import { Box } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import SearchBar from "components/blocks/SearchBar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValue {
  book: string;
  startDate: string;
  endDate: string;
  persons: number;
  introduction: string;
}

const CreatePage = () => {
  const navigate = useNavigate();

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
      book: "",
      startDate: "",
      endDate: "",
      persons: 0,
      introduction: "",
    },
    mode: "onChange",
  });

  const handleCreate = () => {
    console.log("챌린지 생성");
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
          name="book"
          control={control}
          textFieldProps={{
            type: "text",
            id: "challenge-book",
            label: "도서 제목",
            placeholder: "도서를 검색하세요",
          }}
        />
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
          name="persons"
          control={control}
          textFieldProps={{
            type: "number",
            id: "challenge-persons",
            label: "챌린지 인원",
            placeholder: "인원을 설정하세요",
          }}
        />
        <CustomTextField
          name="introduction"
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
