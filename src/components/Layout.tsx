import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import { Box, Container } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AppBar />
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
