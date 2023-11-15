import { Box } from "@mui/material";
import CommonSnackBar from "components/common/CommonSnackBar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "store/store";

const NotPrivateRoute = () => {
  // 토큰으로 로그인 확인, 비로그인 상태여야함
  const memberToken = useSelector((state: RootState) => state.auth.token);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("../");
  };

  return memberToken ? (
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
