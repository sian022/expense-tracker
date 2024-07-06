import router from "./app/router";
import theme from "./app/theme";
import store from "./app/store";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
