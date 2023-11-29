import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";

type PropsType = {
  handleSelectPlan: (planInfo: PlanInfo) => void;
  planInfo: PlanInfo;
};

const WritePostBookItem = ({ handleSelectPlan, planInfo }: PropsType) => {
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
          }}
        >
          <CommonTypography text={planInfo.title} variant="body1" bold={true} />
          <CommonTypography
            text={planInfo.author}
            variant="body1"
            bold={false}
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
          <CommonButton
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

export default WritePostBookItem;
