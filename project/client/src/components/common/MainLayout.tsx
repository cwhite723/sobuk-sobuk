import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderBar />
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs></Grid>
        <Grid xs={10}>
          <Outlet />
        </Grid>
        <Grid xs></Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default MainLayout;
