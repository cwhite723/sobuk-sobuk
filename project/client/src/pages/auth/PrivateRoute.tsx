import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("../login");
  };

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="error" variant="filled" onClose={handleClose}>
          로그인이 필요합니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PrivateRoute;
