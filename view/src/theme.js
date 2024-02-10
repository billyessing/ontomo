import { blue, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: blue[500],
    },
  },
  root: {
    display: "flex",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  components: {
    /* Overrides */
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: "240px",
          flexShrink: 0,
        },
        paper: {
          width: "240px",
          boxSizing: "border-box",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "0 16px",
          gap: "16px",
          cursor: "default",
        },
      },
    },

    /* Custom components */
    AuthContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      position: "relative",
      top: "120px",
    },
    AuthForm: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
  },
});

export default theme;
