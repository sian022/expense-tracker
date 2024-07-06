import { Stack } from "@mui/material";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // Main Stack container for the entire layout, occupying full viewport
    <Stack width="100vw" height="100vh" bgcolor="background.default">
      {/* Navbar component for navigation */}
      <Navbar />

      {/* Stack for main content area, with padding and flex to fill remaining space */}
      <Stack padding="20px" flex={1}>
        {/* Outlet component to render nested child routes */}
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default MainLayout;
