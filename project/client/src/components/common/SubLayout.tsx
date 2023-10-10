import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
        <Outlet />
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default SubLayout;
