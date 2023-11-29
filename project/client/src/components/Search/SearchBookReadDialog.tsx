import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import CommonFormHelperText from "components/common/CommonFormHelperText";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import usePlanSubmitMutation from "hooks/mutates/plans/usePlanSubmitMutation";
import { useForm } from "react-hook-form";
import theme from "styles/theme";
import { getStringDate } from "utils/format";
import { getStoredToken } from "utils/get";

interface PropsType {
  isOpen: boolean;
  selectedBook: BookInfoSimple | BookInfo;
  handleDialogClose: () => void;
}

interface FormValue {
  totalPages: number;
  startDate: string;
  endDate: string;
}

const SearchBookReadDialog = ({
  isOpen,
  selectedBook,
  handleDialogClose,
}: PropsType) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // redux에 저장된 토큰 가져오기 - post plan 요청에 필요
  const memberToken = getStoredToken();

  // react hook form
  const { control, handleSubmit, reset, formState } = useForm<FormValue>({
    defaultValues: {
      totalPages: 0,
      startDate: getStringDate(new Date()),
      endDate: getStringDate(new Date()),
    },
    mode: "onSubmit",
  });

  // react-query - post plan
  const { mutate: planSubmitMutate } = usePlanSubmitMutation();

  const handleDialogData = (data: FormValue) => {
    planSubmitMutate(
      {
        bookId: selectedBook.bookId,
        data: {
          startDate: data.startDate,
          endDate: data.endDate,
          totalPage: data.totalPages,
          readPageNumber: 0,
        },
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          reset();
          handleDialogClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>📖 완독 기간 설정하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            기간을 설정하고 독서를 습관으로 만들어보세요!
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "primary.main",
                borderRadius: 5,
                p: 1,
                m: 1,
              }}
            >
              <CommonTypography
                text={selectedBook.title}
                variant="h6"
                bold={true}
              />
              <CommonTypography
                text={selectedBook.author + " | " + selectedBook.publisher}
                variant="body1"
                bold={false}
              />
            </Box>

            <CommonTextField
              name="totalPages"
              control={control}
              rules={{
                required: true,
                min: { value: 1, message: "최소 1이상의 값을 입력해주세요." },
              }}
              textFieldProps={{
                id: "total-pages",
                label: "전체 페이지 수",
                placeholder: "전체 페이지 수를 입력하세요",
                type: "number",
              }}
            />
            <CommonFormHelperText text={formState.errors.totalPages?.message} />

            <CommonTextField
              name="startDate"
              control={control}
              rules={{
                required: true,
                min: {
                  value: getStringDate(new Date()),
                  message: "오늘 날짜부터 선택할 수 있어요.",
                },
              }}
              textFieldProps={{
                id: "start-date",
                label: "시작일",
                type: "date",
              }}
            />
            <CommonFormHelperText text={formState.errors.startDate?.message} />

            <CommonTextField
              name="endDate"
              control={control}
              rules={{
                required: true,
                min: {
                  value: getStringDate(new Date()),
                  message: "오늘 날짜부터 선택할 수 있어요.",
                },
              }}
              textFieldProps={{
                id: "end-date",
                label: "종료일",
                type: "date",
              }}
            />
            <CommonFormHelperText text={formState.errors.endDate?.message} />
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={handleDialogClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchBookReadDialog;
