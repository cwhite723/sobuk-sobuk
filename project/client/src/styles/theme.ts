import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#D9D3CC",
    },
    primary: {
      main: "#D9BBA0",
    },
    text: {
      primary: "#402721",
      secondary: "#D9D3CC",
    },
    action: {
      active: "#8C5F45",
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
