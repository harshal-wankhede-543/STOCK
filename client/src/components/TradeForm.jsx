import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
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
  const apiKey = "O2465H1GY29Q766Y";
  const keywords = ["A", "B", "C", "D"];
  // Fetch available stocks
  useEffect(() => {
    const fetchStocks = async () => {
      const symbols = [];
      // if (!symbol) return;
      try {
        for (const keyword of keywords) {
          const res = await api.get("https://www.alphavantage.co/query", {
            params: {
              function: "SYMBOL_SEARCH",
              keywords: keyword,
              apikey: apiKey,
            },
            timeout: 10000,
          });
          const matches = res.data.bestMatches || [];
          matches.forEach((match) => {
            symbols.push({
              symbol: match["1. symbol"],
              name: match["2. name"],
            });
          });
        }
        setStocks(symbols);
      } catch (e) {
        console.log("error: ", e);
      }
    };
    fetchStocks();
  }, []);
  useEffect(() => {
    const findStock = async () => {
      const res = await api.get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol: symbol,
          interval: "5min",
          apikey: apiKey,
        },
      });
      console.log("api",res.data?.Information || res.data);
      const data = res.data["Time Series (5min)"];
      if (!data)
        return console.log(
          "No data returned, possibly rate limit reached:",
          res.data?.Information || res.data

        );
      const latestTime = Object.keys(data)[0];
      const latestPrice = data[latestTime]["4. close"];
      setCurrentPrice(parseFloat(latestPrice));
      setTotalCost(qty * parseFloat(latestPrice));
    };
    findStock();
  }, [symbol, qty]);
  // Update current price and total cost when symbol or qty changes
  useEffect(() => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (stock) {
      // setCurrentPrice(stock.currentPrice || stock.price);
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
      console.error(err?.response?.data);
      alert("Error executing trade", err?.response?.data);
    }
  };

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
        {/* <InputLabel>Stock</InputLabel> */}
        {/* <TextField
          type="text"
          label="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          fullWidth
          // sx={{ mb: 2}}
        /> */}
        <Select
          value={symbol}
          label="Symbol"
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        >
          {stocks.map((s) => (
            <MenuItem key={s.symbol} value={s.symbol}>
              {s.symbol} - {s.name}
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

      <Typography>
        Total Cost:<b> Rs {totalCost.toFixed(2)} </b>
      </Typography>
      {symbol && (
        <p>
          Latest price for {symbol}: ${currentPrice || "Loading..."}
        </p>
      )}
      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Execute Trade
      </Button>
    </Box>
  );
};

export default TradeForm;
