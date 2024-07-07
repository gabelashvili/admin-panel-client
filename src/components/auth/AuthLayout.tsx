import { Box, alpha } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: (theme) =>
          `linear-gradient(to bottom, ${alpha(theme.palette.background.default, 0.9)}, ${alpha(theme.palette.background.default, 0.9)}), url(/background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 450,
          width: '100%',
          boxShadow: 2,
          borderRadius: 2,
          p: 4,
          height: 'fit-content',
          bgcolor: 'white'
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
