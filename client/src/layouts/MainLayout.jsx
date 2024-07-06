import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Stack width="100vw" height="100vh" bgcolor="background.main">
      <Navbar />

      <Stack padding="20px" flex={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default MainLayout;
