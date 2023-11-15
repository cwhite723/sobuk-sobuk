import { Box } from "@mui/material";
import CommonSnackBar from "components/common/CommonSnackBar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "store/store";

const PrivateRoute = () => {
  const navigate = useNavigate();

  // 토큰으로 로그인 확인, 로그인 상태여야함
  const memberToken = useSelector((state: RootState) => state.auth.token);

  const handleClose = () => {
    navigate("../login");
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
        <CommonSnackBar
          value="로그인이 필요합니다. 로그인 페이지로 이동합니다."
          severity="error"
          open={true}
          handleClose={handleClose}
        />
      </Box>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
