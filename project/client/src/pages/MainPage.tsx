import Grid from "@mui/material/Unstable_Grid2";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import MainPlanCard from "components/main/MainPlanCard";
import CommonLink from "components/common/CommonLink";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useQuery } from "react-query";
import { getPlans } from "apis/plans";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";

const MainPage = () => {
  // plans 상태에 따른 title 설정
  const titleByPlanStatus = {
    NOT_CREATED_POST: "📚 독서 기록을 작성해주세요",
    READING: "📚 완독까지 이만큼 남았어요",
    OVERDUE: "📚 기간이 지나버린 책들이에요",
    NOT_STARTED: "📚 읽을 예정이에요",
    COMPLETED: "📚 완독 후 독서 기록까지 작성했어요",
  };

  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);
  // 가져온 plans 정보
  const [allPlans, setAllPlans] = useState<{ [key: string]: PlanInfo[] }>({});

  // react-query - get plans
  const { data: readingPlans } = useQuery(
    ["getPlans", { status: "READING", token }],
    () => getPlans("READING", token),
    { enabled: !!token },
  );
  const { data: completedPlans } = useQuery(
    ["getPlans", { status: "COMPLETED", token }],
    () => getPlans("COMPLETED", token),
    { enabled: !!token },
  );
  const { data: notCreatedPostPlans } = useQuery(
    ["getPlans", { status: "NOT_CREATED_POST", token }],
    () => getPlans("NOT_CREATED_POST", token),
    { enabled: !!token },
  );
  const { data: notStartedPlans } = useQuery(
    ["getPlans", { status: "NOT_STARTED", token }],
    () => getPlans("NOT_STARTED", token),
    { enabled: !!token },
  );
  const { data: overduePlans } = useQuery(
    ["getPlans", { status: "OVERDUE", token }],
    () => getPlans("OVERDUE", token),
    { enabled: !!token },
  );

  useEffect(() => {
    if (readingPlans) {
      setAllPlans((prevData) => ({
        ...prevData,
        ["READING"]: readingPlans,
      }));
    }
  }, [readingPlans]);

  useEffect(() => {
    if (completedPlans) {
      setAllPlans((prevData) => ({
        ...prevData,
        ["COMPLETED"]: completedPlans,
      }));
    }
  }, [completedPlans]);

  useEffect(() => {
    if (notCreatedPostPlans) {
      setAllPlans((prevData) => ({
        ...prevData,
        ["NOT_CREATED_POST"]: notCreatedPostPlans,
      }));
    }
  }, [notCreatedPostPlans]);

  useEffect(() => {
    if (notStartedPlans) {
      setAllPlans((prevData) => ({
        ...prevData,
        ["NOT_STARTED"]: notStartedPlans,
      }));
    }
  }, [notStartedPlans]);

  useEffect(() => {
    if (overduePlans) {
      setAllPlans((prevData) => ({
        ...prevData,
        ["OVERDUE"]: overduePlans,
      }));
    }
  }, [overduePlans]);

  return (
    <Grid
      container
      columnSpacing={2}
      columns={{ xs: 1, md: 10 }}
      sx={{ width: "100%" }}
    >
      {Object.entries(titleByPlanStatus).map(([status, title]) => (
        <Grid xs={1} md={10} key={status}>
          <CommonSection maxHight={500}>
            <CommonTitle value={title} />
            {allPlans.status ? (
              allPlans.status.map((plan) => (
                <Box key={plan.planId}>
                  <CommonLink to="../write">
                    <MainPlanCard planItem={plan} />
                  </CommonLink>
                </Box>
              ))
            ) : (
              <CommonLink to="../search">
                <CommonTypography
                  value="저장된 독서 정보가 없어요, 독서 검색으로 이동할까요?"
                  bold={true}
                  variant="body1"
                />
              </CommonLink>
            )}
          </CommonSection>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPage;
