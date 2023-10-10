import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs></Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default MainLayout;
