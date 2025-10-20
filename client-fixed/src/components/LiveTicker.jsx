import { Box, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../init/api";

const LiveTicker = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await api.get("/list");
        setStocks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper sx={{ p: 2, overflowX: "auto", mb: 2, display: "flex", gap: 2 }}>
      {stocks.map((s) => {
        const price = s.currentPrice ?? s.price ?? 0; // fallback if undefined
        const change = s.price ? ((price - s.price) / s.price) * 100 : 0;

        return (
          <Box
            key={s._id}
            sx={{
              minWidth: 120,
              p: 1,
              borderRadius: 1,
              bgcolor: "#f5f5f5",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <Typography variant="subtitle2">{s.symbol || "N/A"}</Typography>
            <Typography variant="h6">${price.toFixed(2)}</Typography>
            <Typography variant="body2" sx={{ color: change >= 0 ? "green" : "red" }}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
};

export default LiveTicker;
