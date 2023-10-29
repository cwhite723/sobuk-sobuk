import { Alert, Snackbar } from "@mui/material";

interface PropsType {
  value: string;
  severity: "error" | "success";
  open: boolean;
  handleClose: () => void;
}

const CommonSnackBar: React.FC<PropsType> = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        severity={props.severity}
        variant="filled"
        onClose={props.handleClose}
      >
        {props.value}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackBar;
