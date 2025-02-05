import { createTheme } from "@mui/material";

// Define custom colors
const colors = {
  primary: "#3f51b5",
  secondary: "#4caf50",
  tertiary: "#ff9800",
  background: "#fafbff",
  error: "#f44336",
  success: "#388e3c",
  warning: "#ffa726",
};

// Create MUI theme using createTheme function
const theme = createTheme({
  palette: {
    // Define primary, secondary, tertiary, and background colors
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
    // Customize MUI components
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set border radius for all buttons
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set border radius for all outlined inputs
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff", // Set background color for all input bases
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#fff", // Set background color for table head
        },
      },
    },

    MuiCircularProgress: {
      defaultProps: {
        size: "1.5rem", // Set default size for CircularProgress
      },
    },
  },

  typography: {
    fontFamily: null, // Use the font defined in index.css
  },
});

export default theme;
