import router from "./app/router";
import theme from "./app/theme";
import store from "./app/store";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
