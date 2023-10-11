import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs></Grid>
      <Grid xs={6} disableEqualOverflow>
        <Outlet />
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
};

export default SubLayout;
