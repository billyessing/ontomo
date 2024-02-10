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
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Helvetica Neue"',
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "24px",
      cursor: "default",
    },
  },
  components: {
    /* Overrides */
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "18px",
          textTransform: "none",

          borderRadius: "8px",
          padding: "8px",
          gap: "8px",
        },
        fullWidth: {
          padding: "12px 8px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "600px",
          cursor: "default",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          position: "fixed",
          zIndex: "1000",
          left: "50%",
          top: "35%",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minWidth: "420px",
          padding: "16px",
          gap: "16px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: "240px",
          flexShrink: 0,
          border: "none",
        },
        paper: {
          width: "240px",
          boxSizing: "border-box",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          paddingRight: "16px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
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
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "8px",
        },
      },
    },

    /* Custom components */
    AuthContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      position: "relative",
      top: "120px",
    },
    AuthForm: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
  },
});

export default theme;
