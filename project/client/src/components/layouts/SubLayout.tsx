import { Backdrop, Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store/store";

const SubLayout = () => {
  // 백드롭 표시를 위한 로딩 state
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {/* loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* 사이드 영역 */}
      <Grid xs />
      {/* 컨텐츠 영역 */}
      <Grid xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 로고 */}
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
      </Grid>
      {/* 사이드 영역 */}
      <Grid xs />
    </Grid>
  );
};

export default SubLayout;
