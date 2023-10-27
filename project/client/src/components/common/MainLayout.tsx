import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    // main, feed, group, post, setting, user, write 페이지에 적용되는 레이아웃
    <Box sx={{ flexGrow: 1 }}>
      {/* 공용 HeaderBar */}
      <HeaderBar />
      <Grid container spacing={2} disableEqualOverflow>
        {/* 사이드 영역 */}
        <Grid xs />
        {/* 컨텐츠 영역 */}
        <Grid xs={10} md={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
        {/* 사이드 영역 */}
        <Grid xs />
      </Grid>
      {/* 공용 Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
