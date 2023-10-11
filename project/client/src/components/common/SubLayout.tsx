import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    <Grid container spacing={2}>
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
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
};

export default SubLayout;
