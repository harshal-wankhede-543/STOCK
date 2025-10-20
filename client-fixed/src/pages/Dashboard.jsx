import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import StockList from "../components/StockList.jsx";
import Portfolio from "./Portfolio.jsx";
import TradeForm from "../components/TradeForm.jsx";
import PerformanceChart from "../components/PerformanceChart.jsx";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // closed by default
  const [themeMode, setThemeMode] = useState("light");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setThemeMode(themeMode === "light" ? "dark" : "light");
  const handleStockAdded = () => setRefreshTrigger(prev => prev + 1);

  const theme = createTheme({ palette: { mode: themeMode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar toggleSidebar={toggleSidebar} themeMode={themeMode} toggleTheme={toggleTheme} />
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <StockList />
                  <Portfolio refreshTrigger={refreshTrigger} />
                  <TradeForm onStockAdded={handleStockAdded} />
                  <PerformanceChart />
                </Box>
              }
            />
            <Route path="/portfolio" element={<Portfolio refreshTrigger={refreshTrigger} />} />
            <Route path="/trade" element={<TradeForm onStockAdded={handleStockAdded} />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
