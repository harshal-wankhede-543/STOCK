import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { AccountBalance } from "@mui/icons-material";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeMode, setThemeMode] = useState("light");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setThemeMode(themeMode === "light" ? "dark" : "light");

  const theme = createTheme({ palette: { mode: themeMode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} themeMode={themeMode} toggleTheme={toggleTheme} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} balance={AccountBalance}/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { xs: 0, md: sidebarOpen ? "240px" : 0 },
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
