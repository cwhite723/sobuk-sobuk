import { Box } from "@mui/material";
import BookImage from "components/atoms/BookImage";
import CustomTypography from "components/atoms/CustomTypography";
import ProgressCover from "./ProgressCover";
import { useState } from "react";
import ProgressDialog from "./EditDialog";
import ProgressBar from "./ProgressBar";
import SmallButton from "components/atoms/SmallButton";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import { getStoredToken } from "utils/get";
import { usePlanDelete } from "hooks/mutates/usePlanMutations";

interface PropsType {
  planItem: PlanInfo;
}

const ProgressCard = ({ planItem }: PropsType) => {
  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // Dialog open 여부
  const [openPlanEditDialog, setOpenPlanEditDialog] = useState(false);

  // snackbar open 여부
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);

  // react-query DELETE plan
  const { mutate: planDeleteMutate } = usePlanDelete();

  // 독서 정보(기간, 읽은 페이지) 수정하기
  // READING, OVERDUE, NOT_STARTED
  const handleEditPlan = () => {
    setOpenPlanEditDialog(true);
  };

  // 독서 정보 삭제하기
  const hadleDeletePlan = () => {
    planDeleteMutate(
      { planId: planItem.planId, accessToken: memberToken },
      {
        onSuccess: () => setOpenSuccessSnackBar(true),
      },
    );
  };

  // Dialog 닫기
  const handleDialogClose = () => {
    setOpenPlanEditDialog(false);
  };

  // SnackBar 닫기
  const handleSnackBarClose = () => {
    setOpenSuccessSnackBar(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        mt: 2,
        mb: 2,
      }}
    >
      {/* 삭제 성공 SnackBar */}
      <CustomSnackBar
        text="독서 정보 삭제가 완료되었습니다."
        severity="success"
        open={openSuccessSnackBar}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 독서 진행률 수정을 위한 Dialog */}
      {/* Status가 READING */}
      {planItem.status === "reading" && (
        <ProgressDialog
          selectedPlan={planItem}
          isOpen={openPlanEditDialog}
          handleDialogClose={handleDialogClose}
        />
      )}

      {/* COMPLETED 및 NOT_CREATED_POST 상태일때 커버 표출 */}
      {(planItem.status === "completed" ||
        planItem.status === "not_created_post") && (
        <ProgressCover status={planItem.status} />
      )}

      {/* 상태에 상관없이 공통으로 표출되는 책 정보 */}
      <BookImage width={100} height={150} src={planItem.bookImage} />
      <Box
        sx={{
          width: { xs: "100%", md: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0 auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", mx: 2 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid",
              gap: 2,
              mb: 1,
              overflow: "hidden",
            }}
          >
            <CustomTypography text={planItem.title} variant="h6" bold={true} />
            <CustomTypography
              text={"📝" + (planItem.author ?? "정보없음")}
              variant="body1"
              bold={true}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            {/* 설정된 독서 기간 표출 */}
            {planItem.status === "not_started" ? (
              <CustomTypography
                text={planItem.startDate + "부터 읽을 예정이에요"}
                variant="body1"
                bold={true}
              />
            ) : planItem.status === "overdue" ? (
              <CustomTypography
                text={"설정한 기간이 지났어요. 다시 기간을 설정해주세요"}
                variant="body1"
                bold={true}
              />
            ) : (
              <CustomTypography
                text={planItem.startDate + " ~ " + planItem.endDate}
                variant="body1"
                bold={true}
              />
            )}

            {/* 설정 버튼 */}
            <Box
              sx={{
                display: "flex",
              }}
            >
              <SmallButton
                buttonText="삭제하기"
                handleClickEvent={hadleDeletePlan}
                outline={true}
              />

              <SmallButton
                buttonText={
                  planItem.status === "completed" ||
                  planItem.status === "not_created_post"
                    ? "완독"
                    : planItem.status === "reading"
                      ? "읽는 중"
                      : planItem.status === "overdue"
                        ? "기간 설정"
                        : planItem.status === "not_started"
                          ? "예정"
                          : "정보없음"
                }
                handleClickEvent={handleEditPlan}
                outline={true}
              />
            </Box>
          </Box>

          {/* 진행률 그래프 부분 */}
          <ProgressBar planItem={planItem} />
        </Box>
      </Box>
    </Box>
  );
};
export default ProgressCard;
