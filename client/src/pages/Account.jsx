import { Box, Card, CardContent, Typography, Grid, Avatar, List, ListItem, ListItemText, Divider } from "@mui/material";
import { AttachMoney, TrendingUp, AccountBalanceWallet, History } from "@mui/icons-material";
import { useState, useEffect } from "react";

const Account = () => {
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const cashAvailable = 10000; // Replace with API call if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockRes = await fetch("http://localhost:5000/list"); // fetch stocks
        const stockData = await stockRes.json();
        setStocks(stockData);

        const transRes = await fetch("http://localhost:5000/transactions"); // fetch transactions
        const transData = await transRes.json();
        const sortedTrans = transData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedTrans.slice(0, 5)); // show last 5 transactions
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const totalInvested = stocks.reduce((sum, s) => sum + s.qty * s.price, 0);
  const totalCurrentValue = stocks.reduce((sum, s) => sum + s.qty * (s.currentPrice || s.price), 0);
  const totalProfitLoss = totalCurrentValue - totalInvested;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Account</Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#f0f8ff" }}>
            <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
              <AccountBalanceWallet />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Cash Available</Typography>
              <Typography variant="h6">${cashAvailable.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#fff3e0" }}>
            <Avatar sx={{ bgcolor: "#ff9800", mr: 2 }}>
              <AttachMoney />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Total Invested</Typography>
              <Typography variant="h6">${totalInvested.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: totalProfitLoss >= 0 ? "#e8f5e9" : "#ffebee" }}>
            <Avatar sx={{ bgcolor: totalProfitLoss >= 0 ? "#4caf50" : "#f44336", mr: 2 }}>
              <TrendingUp />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Profit/Loss</Typography>
              <Typography variant="h6" sx={{ color: totalProfitLoss >= 0 ? "green" : "red" }}>
                ${totalProfitLoss.toFixed(2)}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#e1f5fe" }}>
            <Avatar sx={{ bgcolor: "#0288d1", mr: 2 }}>
              <History />
            </Avatar>
            <Box>
              <Typography variant="subtitle2">Recent Activity</Typography>
              <Typography variant="h6">{transactions.length} txns</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
          <List>
            {transactions.length === 0 && <Typography>No recent transactions</Typography>}
            {transactions.map((tx) => (
              <div key={tx._id}>
                <ListItem>
                  <ListItemText
                    primary={`${tx.type.toUpperCase()} - ${tx.symbol}`}
                    secondary={`Qty: ${tx.qty} | Price: $${tx.price} | Date: ${new Date(tx.date).toLocaleDateString()}`}
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
