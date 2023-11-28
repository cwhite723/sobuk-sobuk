import { Box, Button } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";
import MainPlanProgressCover from "./MainPlanProgressCover";
import { useState } from "react";
import MainPlanProgressDialog from "./MainPlanProgressDialog";
import MainPlanProgressBar from "./MainPlanProgressBar";
import CommonButton from "components/common/CommonButton";
import { useMutation, useQuery } from "react-query";
import { deletePlan } from "apis/plans";
import CommonSnackBar from "components/common/CommonSnackBar";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface PropsType {
  planItem: PlanInfo;
}

const MainPlanProgressCard = (props: PropsType) => {
  // redux에 저장된 토큰 가져오기
  const memberToken = useSelector((state: RootState) => state.auth.token);

  // Dialog open 여부
  const [openDialog, setOpenDialog] = useState(false);

  // snackbar open 여부
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // react-query GET book info
  // const { data } = useQuery(["getBook", props.planItem.])

  // react-query DELETE plan
  const { mutate } = useMutation(deletePlan, {
    onSuccess: () => {
      // 삭제 성공
      setOpenSnackBar(true);
    },
    onError: (error) => {
      console.log("삭제 실패", error);
    },
  });

  // 독서 정보(기간, 읽은 페이지) 수정하기
  // READING, OVERDUE, NOT_STARTED
  const handleEditPlan = () => {
    setOpenDialog(true);
  };

  // 독서 정보 삭제하기
  const hadleDeletePlan = () => {
    mutate({ planId: props.planItem.planId, accessToken: memberToken });
  };

  // Dialog 닫기
  const handleClose = () => {
    setOpenDialog(false);
  };

  // SnackBar 닫기
  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
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
      {openSnackBar && (
        <CommonSnackBar
          value="독서 정보 삭제가 완료되었습니다."
          severity="success"
          open={openSnackBar}
          handleClose={handleSnackBarClose}
        />
      )}

      {/* 독서 진행률 수정을 위한 Dialog */}
      {/* Status가 READING */}
      {props.planItem.status === "reading" && openDialog && (
        <MainPlanProgressDialog
          selectedPlan={props.planItem}
          isOpen={openDialog}
          handleClose={handleClose}
        />
      )}

      {/* COMPLETED 및 NOT_CREATED_POST 상태일때 커버 표출 */}
      {(props.planItem.status === "completed" ||
        props.planItem.status === "not_created_post") && (
        <MainPlanProgressCover status={props.planItem.status} />
      )}

      {/* 상태에 상관없이 공통으로 표출되는 책 정보 */}
      <CommonBookImage width={100} height={150} src={null} />
      <Box
        sx={{
          width: { xs: "100%", md: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0 auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "end",
              borderBottom: "1px solid",
              pb: 1,
              mb: 1,
            }}
          >
            <CommonTypography
              value={props.planItem.title + " |"}
              variant="h5"
              bold={true}
            />
            <CommonTypography
              value={props.planItem.author}
              variant="h6"
              bold={true}
            />
            <Button
              sx={{
                position: "absolute",
                bottom: "5px",
                right: "0px",
                color: "text.primary",
                fontWeight: "bold",
                border: "1px solid",
                borderRadius: 5,
                p: 1,
              }}
              onClick={handleEditPlan}
            >
              {(props.planItem.status === "completed" ||
                props.planItem.status === "not_created_post") &&
                "완독"}
              {props.planItem.status === "reading" && "읽는 중"}
              {props.planItem.status === "overdue" && "기간 설정"}
            </Button>
          </Box>

          {/* 설정된 독서 기간 표출 */}
          {props.planItem.status === "not_started" && (
            <CommonTypography
              value={props.planItem.startDate + "부터 읽을 예정이에요"}
              variant="body2"
              bold={true}
            />
          )}
          {props.planItem.status === "overdue" && (
            <CommonTypography
              value={"설정한 기간이 지났어요. 다시 기간을 설정해주세요"}
              variant="body2"
              bold={true}
            />
          )}
          {props.planItem.status === "reading" && (
            <CommonTypography
              value={props.planItem.startDate + " ~ " + props.planItem.endDate}
              variant="body2"
              bold={true}
            />
          )}

          {/* 진행률 그래프 부분 */}
          <MainPlanProgressBar planItem={props.planItem} />
          <CommonButton value="삭제" onClick={hadleDeletePlan} outline={true} />
        </Box>
      </Box>
    </Box>
  );
};
export default MainPlanProgressCard;
