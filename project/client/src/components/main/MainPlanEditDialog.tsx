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
import usePlanEditMutation from "hooks/mutates/plans/usePlanEditMutation";
import { useForm } from "react-hook-form";
import theme from "styles/theme";
import { getStringDate } from "utils/format";
import { getStoredToken } from "utils/get";

interface PropsType {
  selectedPlan: PlanInfo;
  isOpen: boolean;
  handleDialogClose: () => void;
}

interface FormValue {
  startDate: string;
  endDate: string;
  todayPage: number;
}

// 독서 정보(기간, 읽은 페이지) 수정하기
// READING, OVERDUE, NOT_STARTED
const MainPlanEditDialog = ({
  selectedPlan,
  isOpen,
  handleDialogClose,
}: PropsType) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // react hook form
  const { control, handleSubmit, reset, formState } = useForm<FormValue>({
    defaultValues: {
      // 기본값은 기존 date 정보
      // ?? : null, undefined인 경우 오른쪽 값을 반환
      startDate: selectedPlan.startDate ?? getStringDate(new Date()),
      endDate: selectedPlan.endDate ?? getStringDate(new Date()),
      todayPage: 0,
    },
    mode: "onSubmit",
  });

  // react-query - patch plan
  const { mutate: planEditMutate } = usePlanEditMutation();

  const handleDialogData = (formData: FormValue) => {
    // html 폼 요소의 입력값은 기본적으로 문자열
    // 따라서 입력받은 todayPages 값은 숫자형으로 변환해야함
    const numbericTodayPage = Number(formData.todayPage);
    // 입력받은 formData로 plan patch 요청
    // props가 정상적으로 넘어왔을 때만 mutate 실행
    planEditMutate(
      {
        planId: selectedPlan.planId,
        accessToken: memberToken,
        data: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalPage: selectedPlan.totalPage,
          readPageNumber: numbericTodayPage,
        },
      },
      {
        onSuccess: () => {
          reset();
          handleDialogClose();
        },
      },
    );
  };

  // dialog 전체 에러 메세지 추가 필요

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>🔖 독서 정보 수정하기</DialogTitle>

      {/* 컨텐츠 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            독서량을 기록하고 완독까지 달려보세요!
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
              {/* 선택한 plan의 정보 */}
              <CommonTypography
                text={selectedPlan.title}
                variant="h6"
                bold={true}
              />
              <CommonTypography
                text={selectedPlan.author}
                variant="body1"
                bold={false}
              />
              <CommonTypography
                text={
                  selectedPlan.totalPage +
                  "쪽 중에 " +
                  selectedPlan.readPage +
                  " 쪽 까지 읽었어요."
                }
                variant="body1"
                bold={false}
              />
            </Box>

            {/* 페이지 입력 필드 */}
            {/* overdue, not_started일 때는 페이지말고 날짜만 수정가능 */}
            <CommonTextField
              name="todayPage"
              control={control}
              rules={{
                required: true,
                validate: (value) => value > selectedPlan.readPage,
              }}
              textFieldProps={{
                disabled:
                  selectedPlan.status === "overdue" ||
                  selectedPlan.status === "not_started"
                    ? true
                    : false,
                id: "today-page",
                label: "오늘 읽은 페이지",
                placeholder: "오늘은 몇 페이지까지 읽었나요?",
                type: "number",
              }}
            />
            {formState.errors.todayPage && (
              <CommonFormHelperText text="오늘 읽은 페이지가 지금까지 읽은 페이지보다 작을 수 없어요." />
            )}

            {/* overdue, not_started일 때만 수정이 가능한 시작 날짜 */}
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
                disabled:
                  selectedPlan.status === "overdue" ||
                  selectedPlan.status === "not_started"
                    ? false
                    : true,
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

export default MainPlanEditDialog;
