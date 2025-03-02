import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../routes/Navbar';
import Sidebar from './Sidebar';
import { useSidebar } from '../SidebarContext';
import { Outlet } from 'react-router-dom'; // Outlet to render page content
import { useTheme } from "@mui/material/styles";
const Layout = () => {
  const { isSidebarOpen } = useSidebar(); // Get sidebar state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
      }}
    >
      <Box >
        <Sidebar />
      </Box>
      <Box
         component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s ease-in-out",
          marginLeft: isSidebarOpen && !isMobile ? "250px" : "0",
          width: isSidebarOpen && !isMobile ? "calc(100% - 250px)" : "100%",
          display:'flex',
          flexDirection:'column',
          gap:'40px'
        }}
      >
        <Navbar />
        <Outlet /> {/* ✅ This will render child routes correctly */}
      </Box>
    </Box>
  );
};

export default Layout;
