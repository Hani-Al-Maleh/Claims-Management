import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Dashboard, ListAlt, Summarize, Menu } from '@mui/icons-material';
import { useSidebar } from '../SidebarContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { useThemeContext } from '../ThemeContext'; // Theme context
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) toggleSidebar();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1300,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            transition: 'width 0.3s ease-in-out',
            bgcolor:
              mode === 'dark' ? 'background.paper' : 'background.default',
            color: mode === 'dark' ? 'white' : 'black',
          },
        }}
      >
        <List>
          {[
            { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
            { text: 'Claims', icon: <ListAlt />, path: '/claims' },
            { text: 'Report', icon: <Summarize />, path: '/report' },
          ].map(({ text, icon, path }) => (
            <ListItem
              button
              key={text}
              onClick={() => handleNavigation(path)}
              sx={{
                bgcolor: location.pathname === path ? '#000090' : 'transparent', // Selected state (Green)
                color: location.pathname === path ? 'white' : 'inherit',
                cursor: 'pointer', // Pointer on hover
                '&:hover': {
                  bgcolor: '#000030', // Hover state (Red)
                  color: 'white', // Text color when hovering (Yellow)
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === path ? 'white' : 'inherit',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
