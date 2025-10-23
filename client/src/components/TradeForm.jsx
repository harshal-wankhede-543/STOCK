import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../init/api"; // your backend api

const TradeForm = ({ onStockAdded }) => {
  const [data, setData] = useState({
    name: "",
    qty: "",
    price: "",
    avg: "",
    net: "",
    day: "",
  });
  const [stocks, setStocks] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  // const apiKey = "O2465H1GY29Q766Y";
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  // Fetch available stocks
  useEffect(() => {
    const fetchStocks = async () => {
      // const symbols = [];
      try {
        const res = await api.get("/stocks/all-list");
        console.log("get stocks list: ", res?.data?.stocks);
        setStocks(res?.data?.stocks || []);
      } catch (e) {
        console.log("error: ", e?.response?.data);
      }
    };
    fetchStocks();
  }, []);

  // Update totalCost if qty changes
  useEffect(() => {
    if (!currentPrice) return;
    const q = parseInt(data.qty) || 0; // ❌ prevent NaN
    setTotalCost(q * currentPrice);
  }, [ data.qty, currentPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/stocks/buy", data);
      alert("Trade executed!");
      onStockAdded();
      setData({ qty: "", price: "", avg: "", net: "", day: "" });
      setCurrentPrice(0);
      setTotalCost(0);
    } catch (err) {
      console.error(err?.response?.data);
      alert("Error executing trade: " + err?.response?.data);
    }
  };
  useEffect(() => {
    if (!data.name) return;
    const selectedStock = stocks.find((s) => s.name === data.name);
    if (selectedStock) setCurrentPrice(selectedStock.price);
  }, [data.name, stocks]);
  console.log("name: ", data.name);
  return (
    <Box
      component="form"
      sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, maxWidth: 400 }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" gutterBottom>
        Trade Simulator
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Stock</InputLabel>
        <Select
          name="name"
          value={data.name}
          onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
        >
          {stocks.map((s) => (
            <MenuItem key={s.name} value={s.name}>
              {s.name} - {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Quantity"
        name="qty"
        value={data.qty}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* <TextField
        type="number"
        label="Stop Loss"
        value={data.avg}
        name=""
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      /> */}

      <TextField
        type="number"
        name="price"
        label="Enter Price"
        value={data.price}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography>
        Total Cost: <b>Rs {totalCost.toFixed(2)}</b>
      </Typography>

      {data.name && (
        <p>
          Latest price for {data.name}: Rs {currentPrice || "Loading..."}
        </p>
      )}

      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Execute Trade
      </Button>
    </Box>
  );
};

export default TradeForm;
