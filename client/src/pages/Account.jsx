import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  AccountBalanceWallet,
  History,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import api from "../init/api.js";

const Account = () => {
  const [txn,setTxn] = useState("")
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const cashAvailable = 10000; // Replace with API call if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/stocks/buy-list");
        setStocks(res.data?.trades);
        const txnRes = await api.get("/stocks/buy-list");
        console.log("txn data: ", txnRes?.data?.totalNoOfTrades);
        setTxn(txnRes?.data?.totalNoOfTrades)
        const sortedTrans = txnRes?.data?.trades(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      console.log("sorted trans: ", txnRes?.data?.trades);
        // setTransactions(sortedTrans.slice(0, 5)); // show last 5 transactions
      } catch (err) {
        console.error("get Data error: ", err?.message);
      }
    };
    fetchData();
  }, []);

  const totalInvested = stocks.reduce((sum, s) => sum + s.qty * s.price, 0);
  const totalCurrentValue = stocks.reduce(
    (sum, s) => sum + s.qty * (s.currentPrice || s.price),
    0
  );
  const totalProfitLoss = totalCurrentValue - totalInvested;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "#f0f8ff",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <AccountBalanceWallet />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Cash Available</Typography>
              <Typography variant="h6">Rs {cashAvailable.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "#fff3e0",
            }}
          >
            <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
              <AttachMoney />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Total Invested</Typography>
              <Typography variant="h6">Rs {totalInvested.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: totalProfitLoss >= 0 ? "#e8f5e9" : "#ffebee",
            }}
          >
            <Avatar
              sx={{
                bgcolor: totalProfitLoss >= 0 ? "#4caf50" : "#f44336",
                mr: 2,
              }}
            >
              <TrendingUp />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Profit/Loss</Typography>
              <Typography
                variant="h6"
                sx={{ color: totalProfitLoss >= 0 ? "green" : "red" }}
              >
                Rs {totalProfitLoss.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              bgcolor: "#e1f5fe",
            }}
          >
            <Avatar sx={{ bgcolor: "#0288d1", mr: 2 }}>
              <History />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Recent Activity</Typography>
              <Typography variant="h6">{txn} txns</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <List>
            {transactions.length === 0 && (
              <Typography>No recent transactions</Typography>
            )}
            {transactions.map((tx) => (
              <div key={tx._id}>
                <ListItem>
                  <ListItemText
                    primary={`${tx.type.toUpperCase()} - ${tx.symbol}`}
                    secondary={`Qty: ${tx.qty} | Price: $${
                      tx.price
                    } | Date: ${new Date(tx.date).toLocaleDateString()}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Account;
