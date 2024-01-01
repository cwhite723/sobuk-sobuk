import Grid from "@mui/material/Unstable_Grid2";
import Section from "components/blocks/Section";
import ProgressCard from "./ProgressCard";

interface PropsType {
  boxTitle: string;
  plans: PlanInfo[];
}

const PlansSection = ({ boxTitle, plans }: PropsType) => {
  return (
    <Grid xs={1} md={10}>
      <Section maxHight={700} text={boxTitle}>
        {plans.map((planItem, index) => (
          <ProgressCard key={index} planItem={planItem} />
        ))}
      </Section>
    </Grid>
  );
};

export default PlansSection;
