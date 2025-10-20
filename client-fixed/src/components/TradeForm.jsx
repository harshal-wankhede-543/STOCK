import { Api, LineAxisOutlined } from "@mui/icons-material";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import api from "../init/api.js";
const TradeForm = ({ onStockAdded }) => {
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Bought ${qty} shares of ${symbol} at $${price}`);
    // console.log("form submitted", {symbol, qty, price})
    await api.post("/buy", { symbol, qty, price });
    setSymbol(""); setQty(""); setPrice("");
    if (onStockAdded) onStockAdded();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Trade Simulator</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="symbol" label="Stock Symbol" value={symbol} onChange={(e)=>setSymbol(e.target.value)} fullWidth margin="normal"/>
          <TextField name="quantity" label="Quantity" type="number" value={qty} onChange={(e)=>setQty(e.target.value)} fullWidth margin="normal"/>
          <TextField name="price" label="Price" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} fullWidth margin="normal"/>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Buy Stock</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradeForm;
