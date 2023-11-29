import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonSection from "components/common/CommonSection";
import CommonTitle from "components/common/CommonTitle";
import MainPlanProgressCard from "./MainPlanProgressCard";

interface PropsType {
  boxTitle: string;
  plans: PlanInfo[];
}

const MainPlanBox = ({ boxTitle, plans }: PropsType) => {
  return (
    <Grid xs={1} md={10}>
      <CommonSection maxHight={500}>
        <CommonTitle text={boxTitle} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.default",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
            borderRadius: 5,
            p: 2,
            mt: 2,
            mb: 2,
          }}
        >
          {plans.map((planItem, index) => (
            <MainPlanProgressCard key={index} planItem={planItem} />
          ))}
        </Box>
      </CommonSection>
    </Grid>
  );
};

export default MainPlanBox;
