import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Home, ShowChart, AccountBalance, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import api from "../init/api"; // assuming you already have this

const Sidebar = ({ open, toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [balance, setBalance] = useState(0);

  // Fetch balance from backend (optional)
  const fetchBalance = async () => {
    try {
      const res = await api.get("/account"); // example API endpoint
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
      // fallback balance for demo
      setBalance(25000);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <Drawer
      variant="temporary" // always temporary now (even on desktop)
      open={open}
      onClose={toggleSidebar}
      anchor="left"
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Top Menu */}
      <Box>
        <IconButton onClick={toggleSidebar} sx={{ m: 1 }}>
          <Menu />
        </IconButton>
        <List>
          <ListItem button component={Link} to="/" onClick={isMobile ? toggleSidebar : null}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to="/portfolio" onClick={isMobile ? toggleSidebar : null}>
            <ListItemIcon><AccountBalance /></ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItem>

          <ListItem button component={Link} to="/trade" onClick={isMobile ? toggleSidebar : null}>
            <ListItemIcon><ShowChart /></ListItemIcon>
            <ListItemText primary="Trade" />
          </ListItem>
        </List>
      </Box>

      {/* Account Section */}
      <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid #ddd" }}>
        <Typography variant="subtitle2" color="textSecondary">
          Account Balance
        </Typography>
        <Typography variant="h6" sx={{ color: "green", mt: 0.5 }}>
          ₹{balance.toLocaleString()}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
