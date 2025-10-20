import { Box, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../init/api"; // your backend api

const TradeForm = ({ onStockAdded }) => {
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Fetch available stocks
  useEffect(() => {
    const fetchStocks = async () => {
      const res = await api.get("/list");
      setStocks(res.data);
    };
    fetchStocks();
  }, []);

  // Update current price and total cost when symbol or qty changes
  useEffect(() => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (stock) {
      setCurrentPrice(stock.currentPrice || stock.price);
      setTotalCost(qty * (stock.currentPrice || stock.price));
    }
  }, [symbol, qty, stocks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol || qty <= 0) return alert("Enter valid stock and quantity");

    try {
      await api.post("/trade", { symbol, qty, stopLoss, takeProfit });
      alert("Trade executed!");
      onStockAdded(); // refresh portfolio
      setQty(0);
      setStopLoss(0);
      setTakeProfit(0);
      setSymbol("");
    } catch (err) {
      console.error(err);
      alert("Error executing trade");
    }
  };

  return (
    <Box component="form" sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, maxWidth: 400 }} onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Trade Simulator</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Stock</InputLabel>
        <Select value={symbol} label="Stock" onChange={(e) => setSymbol(e.target.value)}>
          {stocks.map((s) => (
            <MenuItem key={s._id} value={s.symbol}>
              {s.symbol} - ${s.currentPrice || s.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Quantity"
        value={qty}
        onChange={(e) => setQty(parseInt(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        type="number"
        label="Stop Loss"
        value={stopLoss}
        onChange={(e) => setStopLoss(parseFloat(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        type="number"
        label="Take Profit"
        value={takeProfit}
        onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography>Total Cost: ${totalCost.toFixed(2)}</Typography>

      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Execute Trade
      </Button>
    </Box>
  );
};

export default TradeForm;
