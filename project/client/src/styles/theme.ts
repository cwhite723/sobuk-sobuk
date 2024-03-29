import { red, green, blueGrey, grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: grey[100],
      },
      primary: {
        main: grey[300],
        light: grey[200],
        dark: blueGrey[900],
      },
      text: {
        primary: "#293847",
        secondary: grey[50],
      },
      error: {
        main: red[500],
      },
      success: {
        main: green[500],
      },
    },
  }),
);

export default theme;
