import { createBrowserRouter } from "react-router-dom";
import ExpensesPage from "../pages/ExpensesPage";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ExpensesPage />,
      },
    ],
  },
]);

export default router;
