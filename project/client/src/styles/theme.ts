import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D9BBA0",
    },
    secondary: {
      main: "#402721",
    },
    background: {
      default: "#D9D3CC",
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
