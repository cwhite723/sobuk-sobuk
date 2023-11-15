import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";
import { useEffect, useState } from "react";
import { getDaysDiff, getPercent, getTodayPage } from "utils/calculation";

interface PropsType {
  planItem: PlanInfo;
}

const MainPlanProgressBar = (props: PropsType) => {
  // 오늘부터 endDate까지 남은 일 수
  const [dayDiff, setDayDiff] = useState<number | null>(null);
  // 오늘 읽어야 할 페이지 수
  const [todayPage, setTodayPage] = useState<number | null>(null);
  // 저장된 진행상황(퍼센트)
  const [percent, setPercent] = useState<number | null>(null);

  useEffect(() => {
    if (props.planItem.readPageNumber) {
      setDayDiff(getDaysDiff(props.planItem.endDate));
      setPercent(
        getPercent(props.planItem.readPageNumber, props.planItem.totalPage),
      );
      if (dayDiff) {
        setTodayPage(
          getTodayPage(
            props.planItem.totalPage - props.planItem.readPageNumber,
            dayDiff,
          ),
        );
      }
    }
  }, [props.planItem.readPageNumber, dayDiff, todayPage]);

  // READING: 저장된 페이지 수를 기반으로 그래프 표시, 오늘부터 endDate까지 읽어야하는 페이지를 안내
  // OVERDUE: 저장된 페이지 수를 기반으로 그래프 표시, 날짜 수정 유도
  // NOT_STARTED: 0
  // COMPLETED, NOT_CREATED_POST: 100

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {props.planItem.status === "READING" && (
          <CommonTypography
            value={
              "오늘은 " +
              props.planItem.readPageNumber +
              todayPage +
              "쪽까지 읽어야 해요"
            }
            variant="body1"
            bold={true}
          />
        )}
        <CommonTypography
          value={percent + "/100"}
          variant="body2"
          bold={true}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "25px",
          backgroundColor: "primary.main",
          borderRadius: 5,
          mt: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: percent + "%",
            height: "25px",
            backgroundColor: "text.primary",
            borderRadius: 5,
          }}
        />
      </Box>
    </>
  );
};

export default MainPlanProgressBar;
