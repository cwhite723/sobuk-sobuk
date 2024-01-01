import Grid from "@mui/material/Unstable_Grid2";
import PlansSection from "components/blocks/plan/PlansSection";
import CustomTypography from "components/atoms/CustomTypography";
import { getStoredToken } from "utils/get";
import usePlansQuery from "hooks/queries/plans/usePlansQuery";
import { textByPlanStatus } from "constants/texts";
import { Box } from "@mui/material";

const PlanPage = () => {
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
      {readingPlans && readingPlans.data.length !== 0 && (
        <PlansSection
          plans={readingPlans.data}
          boxTitle={textByPlanStatus.READING}
        />
      )}
      {notCreatedPostPlans && notCreatedPostPlans.data.length !== 0 && (
        <PlansSection
          plans={notCreatedPostPlans.data}
          boxTitle={textByPlanStatus.NOT_CREATED_POST}
        />
      )}
      {notStartedPlans && notStartedPlans.data.length !== 0 && (
        <PlansSection
          plans={notStartedPlans.data}
          boxTitle={textByPlanStatus.NOT_STARTED}
        />
      )}
      {overduePlans && overduePlans.data.length !== 0 && (
        <PlansSection
          plans={overduePlans.data}
          boxTitle={textByPlanStatus.OVERDUE}
        />
      )}
      {completedPlans && completedPlans.data.length !== 0 && (
        <PlansSection
          plans={completedPlans.data}
          boxTitle={textByPlanStatus.COMPLETED}
        />
      )}

      {(!isSuccessReading ||
        !isSuccessCompleted ||
        !isSuccessNotCreatedPost ||
        !isSuccessNotStarted ||
        !isSuccessOverdue) && (
        <Box sx={{ m: 5 }}>
          <CustomTypography
            text="독서 정보를 가져오는데 실패했어요. 잠시 후 다시 시도해주세요."
            bold={true}
            variant="body1"
          />
        </Box>
      )}

      {!readingPlans?.data &&
        !completedPlans?.data &&
        !notCreatedPostPlans?.data &&
        !notStartedPlans?.data &&
        !overduePlans?.data && (
          <Box sx={{ m: 5 }}>
            <CustomTypography
              text="등록된 독서 정보가 없어요."
              variant="h5"
              bold={true}
            />
          </Box>
        )}
    </Grid>
  );
};

export default PlanPage;
