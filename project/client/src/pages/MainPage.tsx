import Grid from "@mui/material/Unstable_Grid2";
import MainPlanBox from "components/main/MainPlanBox";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import { getStoredToken } from "utils/get";
import usePlansQuery from "hooks/queries/plans/usePlansQuery";
import { titleByPlanStatus } from "constants/titles";
import { Box } from "@mui/material";

const MainPage = () => {
  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // react-query - GET plans
  const { data: readingPlans, isSuccess: isSuccessReading } = usePlansQuery(
    "READING",
    memberToken,
    {
      enabled: !!memberToken,
    },
  );
  const { data: completedPlans, isSuccess: isSuccessCompleted } = usePlansQuery(
    "COMPLETED",
    memberToken,
    {
      enabled: !!memberToken,
    },
  );
  const { data: notCreatedPostPlans, isSuccess: isSuccessNotCreatedPost } =
    usePlansQuery("NOT_CREATED_POST", memberToken, {
      enabled: !!memberToken,
    });
  const { data: notStartedPlans, isSuccess: isSuccessNotStarted } =
    usePlansQuery("NOT_STARTED", memberToken, {
      enabled: !!memberToken,
    });
  const { data: overduePlans, isSuccess: isSuccessOverdue } = usePlansQuery(
    "OVERDUE",
    memberToken,
    {
      enabled: !!memberToken,
    },
  );

  return (
    <Grid
      container
      columnSpacing={2}
      columns={{ xs: 1, md: 10 }}
      sx={{ width: "100%" }}
    >
      {readingPlans && (
        <MainPlanBox
          plans={readingPlans.data}
          boxTitle={titleByPlanStatus.READING}
        />
      )}
      {completedPlans && (
        <MainPlanBox
          plans={completedPlans.data}
          boxTitle={titleByPlanStatus.COMPLETED}
        />
      )}
      {notCreatedPostPlans && (
        <MainPlanBox
          plans={notCreatedPostPlans.data}
          boxTitle={titleByPlanStatus.NOT_CREATED_POST}
        />
      )}
      {notStartedPlans && (
        <MainPlanBox
          plans={notStartedPlans.data}
          boxTitle={titleByPlanStatus.NOT_STARTED}
        />
      )}
      {overduePlans && (
        <MainPlanBox
          plans={overduePlans.data}
          boxTitle={titleByPlanStatus.OVERDUE}
        />
      )}

      {(!isSuccessReading ||
        !isSuccessCompleted ||
        !isSuccessNotCreatedPost ||
        !isSuccessNotStarted ||
        !isSuccessOverdue) && (
        <Box sx={{ m: 5 }}>
          <CommonTypography
            text="독서 정보를 가져오는데 실패했어요. 잠시 후 다시 시도해주세요."
            bold={true}
            variant="body1"
          />
        </Box>
      )}
    </Grid>
  );
};

export default MainPage;
