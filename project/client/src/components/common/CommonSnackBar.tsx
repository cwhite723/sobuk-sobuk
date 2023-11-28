import { Alert, Snackbar } from "@mui/material";

interface PropsType {
  text: string;
  severity: "error" | "success";
  open: boolean;
  handleSnackBarClose: () => void;
}

// 어떤 요청 결과를 나타내기 위한 SnackBar 컴포넌트
const CommonSnackBar = ({
  text,
  severity,
  open,
  handleSnackBarClose,
}: PropsType) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert severity={severity} variant="filled" onClose={handleSnackBarClose}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackBar;
