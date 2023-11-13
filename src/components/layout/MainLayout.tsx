import React from "react";
import { Box, Toolbar } from "@mui/material";
import Topbar from "../common/sidebars/Topbar";
import sizeConfigs from "../../configs/sizeConfigs";
import colorConfigs from "../../configs/colorConfigs";
import { Outlet } from "react-router-dom";
import SidebarNav from "../common/sidebars/SidebarNav";

interface MainLayoutProps {
  setToken: (value: any) => void;
}
const MainLayout = ({ setToken }: MainLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
        }}
      >
        <SidebarNav setToken={setToken} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `100%`,
          minHeight: "100%",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
