import { createTheme } from "@mui/material";

const colors = {
  primary: "#3f51b5",
  secondary: "#4caf50",
  tertiary: "#ff9800",
  background: "#fafbff",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    tertiary: {
      main: colors.tertiary,
    },
    background: {
      default: colors.background,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },

    MuiCircularProgress: {
      defaultProps: {
        size: "1.5rem",
      },
    },
  },

  typography: {
    fontFamily: null, // Use the font defined in index.css
  },
});

export default theme;
