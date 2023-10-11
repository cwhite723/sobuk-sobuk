import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderBar />
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default MainLayout;
