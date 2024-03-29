import { Box } from "@mui/material";
import SmallButton from "components/atoms/SmallButton";
import CustomTypography from "components/atoms/CustomTypography";

type PropsType = {
  handleSelectPlan: (planInfo: PlanInfo) => void;
  planInfo: PlanInfo;
};

const BookItems = ({ handleSelectPlan, planInfo }: PropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        "&:nth-of-type(odd)": {
          backgroundColor: "primary.light",
        },
      }}
    >
      {planInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "start", md: "center" },

            gap: 1,
          }}
        >
          <CustomTypography text={planInfo.title} variant="h6" bold={true} />
          <CustomTypography
            text={"📝" + planInfo.author}
            variant="body1"
            bold={true}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "end", md: "center" },
        }}
      >
        {planInfo && (
          <SmallButton
            buttonText="✔선택하기"
            outline={false}
            handleClickEvent={() => {
              handleSelectPlan(planInfo);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default BookItems;
