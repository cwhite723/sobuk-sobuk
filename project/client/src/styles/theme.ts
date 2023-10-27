import { red, green, blueGrey, grey } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: grey[300],
      },
      primary: {
        main: blueGrey[200],
        light: blueGrey[100],
        dark: blueGrey[900],
      },
      text: {
        primary: grey[900],
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
