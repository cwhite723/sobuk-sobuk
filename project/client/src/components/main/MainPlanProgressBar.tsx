import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";
import { getPercent } from "utils/calculation";

interface PropsType {
  planItem: PlanInfo;
}

const MainPlanProgressBar = ({ planItem }: PropsType) => {
  // 저장된 진행상황(퍼센트)
  const percent = getPercent(planItem.readPage, planItem.totalPage);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {planItem.status === "reading" && (
          <CommonTypography
            text={
              "오늘은 " +
              (planItem.readPage === 0
                ? planItem.todayPage
                : planItem.readPage + planItem.todayPage) +
              "쪽까지 읽어야 해요"
            }
            variant="body1"
            bold={true}
          />
        )}
        <CommonTypography text={percent + "/100"} variant="body2" bold={true} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "25px",
            backgroundColor: "primary.main",
            borderRadius: 5,
            my: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: percent + "%",
              height: "25px",
              backgroundColor: "text.primary",
              borderRadius: 5,
            }}
          />
          <Box
            component="img"
            sx={{
              position: "absolute",
              top: -2,
              right: -5,
              width: 25,
            }}
            src={
              process.env.PUBLIC_URL +
              ((percent >= 90 && "img/step3.png") ||
                (percent < 90 && 29 < percent && "img/step2.png") ||
                "img/step1.png")
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPlanProgressBar;
