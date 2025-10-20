import { 
  Box, CssBaseline, createTheme, ThemeProvider, Card, CardContent, Typography, List, ListItem, LinearProgress, Chip, Divider 
} from "@mui/material";
import { useState, useEffect } from "react";
import PerformanceChart from "../components/PerformanceChart.jsx";
import LiveTicker from "../components/LiveTicker.jsx";
import api from "../init/api";

const Dashboard = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [stocks, setStocks] = useState([]);

  const toggleTheme = () => setThemeMode(themeMode === "light" ? "dark" : "light");
  const theme = createTheme({ palette: { mode: themeMode } });

  const fetchStocks = async () => {
    try {
      const res = await api.get("/list");
      setStocks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const totalValue = stocks.reduce((acc, s) => acc + s.qty * s.price, 0);
  const totalStocks = stocks.length;
  const recentPurchases = [...stocks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* Top Row: Live Stocks + Portfolio Performance */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1,
            mb: 2,
          }}
        >
          <Card sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Live Stocks
              </Typography>
              <LiveTicker />
            </CardContent>
          </Card>

          <Card sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Portfolio Performance
              </Typography>
              {stocks.map((s) => {
                const stockValue = s.qty * s.price;
                const percentage = totalValue ? (stockValue / totalValue) * 100 : 0;
                return (
                  <Box key={s._id} sx={{ mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span>{s.symbol}</span>
                      <span>${stockValue.toFixed(2)}</span>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": { backgroundColor: "#3f51b5" },
                      }}
                    />
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Box>

        {/* Bottom Row: My Portfolio + Performance Chart */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1,
          }}
        >
          <Card sx={{ maxHeight: "600px", overflowY: "auto" }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                My Portfolio Status
              </Typography>
              <Typography>Total Stocks: {totalStocks}</Typography>
              <Typography>Total Value: ${totalValue.toFixed(2)}</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1" gutterBottom>
                Top 3 Recent Purchases
              </Typography>
              <List>
                {recentPurchases.map((s) => (
                  <ListItem key={s._id} sx={{ justifyContent: "space-between" }}>
                    <span>
                      {s.symbol} - {s.qty} shares
                    </span>
                    <Chip label={`$${s.price}`} size="small" color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <PerformanceChart />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
