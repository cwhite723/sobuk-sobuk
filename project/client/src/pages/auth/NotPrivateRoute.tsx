import { Box } from "@mui/material";
import CommonSnackBar from "components/common/CommonSnackBar";
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
        {/* snackbar */}
        <CommonSnackBar
          value="이미 로그인 되어 있습니다. 홈으로 이동합니다."
          severity="error"
          open={true}
          handleClose={handleClose}
        />
      </Box>
      <Outlet />
    </>
  ) : (
    <Outlet />
  );
};

export default NotPrivateRoute;
