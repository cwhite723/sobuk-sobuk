import Grid from "@mui/material/Unstable_Grid2";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import MainPlanProgressCard from "./MainPlanProgressCard";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  boxTitle: string;
  plans: PlanInfo[];
}

const MainPlanBox = ({ boxTitle, plans }: PropsType) => {
  return (
    <Grid xs={1} md={10}>
      <CommonSection maxHight={700}>
        <CommonTitle text={boxTitle} />

        {plans.length === 0 ? (
          <CommonTypography
            text="등록된 독서 정보가 없어요."
            variant="h5"
            bold={true}
          />
        ) : (
          plans.map((planItem, index) => (
            <MainPlanProgressCard key={index} planItem={planItem} />
          ))
        )}
      </CommonSection>
    </Grid>
  );
};

export default MainPlanBox;
