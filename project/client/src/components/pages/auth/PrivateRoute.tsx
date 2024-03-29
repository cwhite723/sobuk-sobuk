import { Box } from "@mui/material";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import { Outlet, useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

const PrivateRoute = () => {
  const navigate = useNavigate();

  // 토큰으로 로그인 확인, 로그인 상태여야함
  const memberToken = getStoredToken();

  const handleSnackBarClose = () => {
    navigate("../log-in");
  };

  return memberToken ? (
    <Outlet />
  ) : (
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
        <CustomSnackBar
          text="로그인이 필요합니다. 로그인 페이지로 이동합니다."
          severity="error"
          open={true}
          handleSnackBarClose={handleSnackBarClose}
        />
      </Box>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
