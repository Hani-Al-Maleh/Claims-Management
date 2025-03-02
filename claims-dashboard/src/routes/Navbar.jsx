import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import { Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "../SidebarContext";
import { useTheme } from "@mui/material/styles";
const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Claims Management
        </Typography>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} sx={{ color: 'inherit', mr: 2 }}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Logout Button */}
        <IconButton onClick={handleLogout} sx={{ color: 'error.main' }}>
          <Logout />
        </IconButton>
        {
          isMobile ? '' :
        <IconButton sx={{position:'absolute', left:0, pr:4}} edge="start" color="inherit" onClick={toggleSidebar} >
          <MenuIcon />
        </IconButton>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
