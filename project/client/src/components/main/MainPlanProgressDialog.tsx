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
import { patchPlan } from "apis/plans";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import theme from "styles/theme";
import { getDateObject, getStringDate } from "utils/format";

interface PropsType {
  selectedPlan: PlanInfo;
  isOpen: boolean;
  handleClose: () => void;
}

interface FormValue {
  startDate: Date;
  endDate: Date;
  todayPage: number;
}

// 독서 정보(기간, 읽은 페이지) 수정하기
// READING, OVERDUE, NOT_STARTED
const MainPlanProgressDialog = (props: PropsType) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // react hook form
  const { control, handleSubmit, reset, getValues } = useForm<FormValue>({
    defaultValues: {
      // 기본값은 기존 date 정보
      // ?? : null, undefined인 경우 오른쪽 값을 반환
      startDate: getDateObject(props.selectedPlan.startDate) ?? new Date(),
      endDate: getDateObject(props.selectedPlan.endDate) ?? new Date(),
      todayPage: 0,
    },
  });

  // react-query - patch plan
  const { mutate, isError } = useMutation(patchPlan, {
    onSuccess: async () => {
      // 요청이 성공하면 폼을 비우고 Dialog를 닫음
      reset();
      props.handleClose();
    },
    onError: (error) => {
      // 요청 실패 시 Dialog를 닫지 않고 내부에서 error 메세지 표출
      console.log("isError:" + isError, error);
    },
  });

  const handleDialogData = async (formData: FormValue) => {
    // html 폼 요소의 입력값은 기본적으로 문자열
    // 따라서 입력받은 todayPages 값은 숫자형으로 변환해야함
    const numbericTodayPage = Number(formData.todayPage);
    // 입력받은 formData로 plan patch 요청
    // props가 정상적으로 넘어왔을 때만 mutate 실행
    if (props.selectedPlan.planId) {
      await mutate({
        planId: props.selectedPlan.planId,
        accessToken: token,
        data: {
          startDate: getStringDate(formData.startDate),
          endDate: getStringDate(formData.endDate),
          totalPage: props.selectedPlan.totalPage,
          readPageNumber: numbericTodayPage,
        },
      });
    }
  };

  // dialog 전체 에러 메세지 추가 필요

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
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
                value={props.selectedPlan.title}
                variant="h6"
                bold={true}
              />
              <CommonTypography
                value={props.selectedPlan.author}
                variant="body1"
                bold={false}
              />
              <CommonTypography
                value={
                  props.selectedPlan.totalPage +
                  "쪽 중에 " +
                  props.selectedPlan.todayPage +
                  " 쪽 까지 읽었어요."
                }
                variant="body1"
                bold={false}
              />
            </Box>

            {/* 입력 필드 */}
            <CommonTextField
              name="todayPage"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  props.selectedPlan.todayPage
                    ? value > 0
                    : value > props.selectedPlan.todayPage,
              }}
              textFieldProps={{
                id: "today-page",
                label: "Today Page",
                placeholder: "오늘은 몇 페이지까지 읽었나요?",
                type: "number",
              }}
            />

            <CommonTextField
              name="startDate"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "start-date",
                label: "Start",
                type: "date",
              }}
            />
            <CommonTextField
              name="endDate"
              control={control}
              rules={{
                required: true,
                min: getStringDate(getValues("startDate")),
              }}
              textFieldProps={{
                id: "end-date",
                label: "End",
                type: "date",
              }}
            />
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={props.handleClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainPlanProgressDialog;
