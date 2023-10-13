import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

const MainBookRankCard = () => {
  return (
    <Grid xs="auto" md={5} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
          borderRadius: 5,
          p: 2,
          m: 2,
        }}
      >
        <CommonBookImage width={100} height={150} />

        <CommonTypography value="책 제목" variant="h6" bold={true} />
        <CommonTypography value="지은이" variant="body2" bold={false} />
        <CommonTypography value="한줄소개" variant="body2" bold={false} />
      </Box>
    </Grid>
  );
};

export default MainBookRankCard;
