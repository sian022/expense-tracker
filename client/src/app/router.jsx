import { createBrowserRouter } from "react-router-dom";
import ExpensesPage from "../pages/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <ExpensesPage />,
  },
]);

export default router;
