import { useState } from "react";
import { Navbar } from "../navbar/Navbar";
import { Box } from "@mui/material";
import { Sidebar } from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <Box display="flex" width="100%" height="100%" sx={{ overflowX: "hidden" }}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Box width="100%">
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};
