import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Typography,
  Button,
  Toolbar,
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Avatar
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import authApi, { selectAuthedUser } from '../store/api/userApi';
import paths from '../utils/paths';

const drawerWidth = 240;
const navItems = [
  { label: 'Players', path: paths.players },
  { label: 'Games', path: paths.games }
];

const DrawerAppBar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthedUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const isSelected = (path: string) => pathname === path;

  const logOut = () => {
    dispatch(authApi.util.resetApiState());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Admin Panel
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: isSelected(item.path) ? 600 : 400 } }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography
          sx={{ fontSize: 14, px: 2, py: 1, fontWeight: 500, textAlign: 'center' }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => navigate(paths.user.profile)} sx={{ py: 0, textAlign: 'center' }}>
          <ListItemText>My Account</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={logOut} sx={{ py: 0, textAlign: 'center', color: 'red' }}>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Admin Panel
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{ color: 'white', fontWeight: isSelected(item.path) ? 600 : 400 }}>
                {item.label}
              </Button>
            ))}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 4 }}>
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              slotProps={{ paper: { sx: { py: 1, width: 240 } } }}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}>
              <Typography
                sx={{
                  fontSize: 14,
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  textAlign: 'center'
                }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
              <Divider sx={{ my: 1 }} />
              <ListItemButton
                onClick={() => {
                  navigate(paths.user.profile);
                  setAnchorEl(null);
                }}
                sx={{ py: 1 }}>
                <ListItemText>My Account</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={logOut} sx={{ py: 1, color: 'red' }}>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}>
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, bgcolor: '#eef5f9', width: '100%' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DrawerAppBar;
