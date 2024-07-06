import router from "./app/router";
import theme from "./app/theme";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
