import { Box } from "@mui/material";
import CommonSnackBar from "components/common/CommonSnackBar";
import { Outlet, useNavigate } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";

const NotPrivateRoute = () => {
  const navigate = useNavigate();

  // 토큰으로 로그인 확인, 비로그인 상태여야함
  // 유저 정보가 제대로 넘어왔는지도 확인해야 함
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  const handleSnackBarClose = () => {
    navigate("../");
  };

  return memberToken && memberInfo ? (
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
          text="이미 로그인 되어 있어요."
          severity="success"
          open={true}
          handleSnackBarClose={handleSnackBarClose}
        />
      </Box>
      <Outlet />
    </>
  ) : (
    <Outlet />
  );
};

export default NotPrivateRoute;
