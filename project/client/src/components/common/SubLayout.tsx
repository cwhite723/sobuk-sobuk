import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
<<<<<<< HEAD
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid xs></Grid>
      <Grid xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 1,
              maxWidth: 400,
              height: "100%",
              mt: 10,
              mb: 5,
            }}
            src={process.env.PUBLIC_URL + "img/logo.png"}
          />
          <Outlet />
        </Box>
=======
    // login, join 페이지에 적용되는 레이아웃
    <Grid container spacing={2} width="100%">
      {/* 사이드 영역 */}
      <Grid xs />
      {/* 컨텐츠 영역 */}
      <Grid xs={6} disableEqualOverflow>
        <Outlet />
>>>>>>> fe/common
      </Grid>
      {/* 사이드 영역 */}
      <Grid xs />
    </Grid>
  );
};

export default SubLayout;
