import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("../");
  };

  return isLoggedIn ? (
    <>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="error" variant="filled" onClose={handleClose}>
          이미 로그인 되어 있습니다.
        </Alert>
      </Snackbar>
    </>
  ) : (
    <>{children}</>
  );
};

export default NotPrivateRoute;
