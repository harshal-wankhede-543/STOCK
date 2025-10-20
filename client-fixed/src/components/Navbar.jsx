import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu, Brightness4, Brightness7 } from "@mui/icons-material";

const Navbar = ({ toggleSidebar, themeMode, toggleTheme }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Dashboard
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
