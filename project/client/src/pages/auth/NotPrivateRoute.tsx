import { Alert, Box, Snackbar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const NotPrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("../");
  };

  return isLoggedIn ? (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)",
          zIndex: "2",
        }}
      >
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <Alert severity="error" variant="filled" onClose={handleClose}>
            이미 로그인 되어 있습니다. 홈으로 이동합니다.
          </Alert>
        </Snackbar>
      </Box>
      <Outlet />
    </>
  ) : (
    <Outlet />
  );
};

export default NotPrivateRoute;
