import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Home, ShowChart, AccountBalance, Menu, AttachMoney } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ open, toggleSidebar, accountBalance = 10000 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile/tablet
  const location = useLocation(); // get current path for highlighting

  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/" },
    { text: "Portfolio", icon: <AccountBalance />, path: "/portfolio" },
    { text: "Trade", icon: <ShowChart />, path: "/trade" },
    { text: "Account", icon: <AttachMoney />, path: "/account" },
  ];

  return (
    <Drawer
      variant="temporary" // temporary drawer for both mobile & desktop
      open={open}
      onClose={toggleSidebar}
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          p: 2,
        },
      }}
    >
      {/* Menu toggle */}
      <IconButton onClick={toggleSidebar} sx={{ mb: 2 }}>
        <Menu />
      </IconButton>

      {/* Account Balance */}
      <Box sx={{ mb: 3, p: 1, bgcolor: "primary.main", color: "white", borderRadius: 2 }}>
        <Typography variant="subtitle2">Account Balance</Typography>
        <Typography variant="h6">${accountBalance.toLocaleString()}</Typography>
      </Box>

      {/* Navigation Links */}
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            onClick={isMobile ? toggleSidebar : undefined}
            selected={location.pathname === item.path} // highlight active page
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
