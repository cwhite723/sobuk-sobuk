import { Box } from "@mui/material";
import MainPlanProgressCard from "./MainPlanProgressCard";

interface PropsType {
  planItem: PlanInfo;
}

const MainPlanCard = (props: PropsType) => {
  return (
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
      {props.planItem && <MainPlanProgressCard planItem={props.planItem} />}
    </Box>
  );
};

export default MainPlanCard;
