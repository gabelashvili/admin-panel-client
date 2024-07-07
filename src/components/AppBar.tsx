import {
  AppBar as AppBarMui,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Divider
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';
import { selectAuthedUser } from '../store/api/userApi';
import { useAppSelector } from '../store/store';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = [{ label: 'Profile', path: '/user/profile' }];

function AppBar() {
  const authedUser = useAppSelector(selectAuthedUser);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBarMui position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar title={!authedUser?.avatar ? `${authedUser?.firstName[0]}${authedUser?.lastName[0]}` : ''} src={authedUser.avatar}>
                  {!authedUser?.avatar ? `${authedUser?.firstName[0]}${authedUser?.lastName[0]}` : ''}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              slotProps={{ paper: { sx: { minWidth: 300 } } }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <Typography textAlign="center" sx={{ p: 2, fontWeight: 600 }}>
                {`${authedUser.firstName} ${authedUser.lastName}`}
              </Typography>
              {settings.map((setting) => (
                <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography color={'error'} textAlign="center">
                  Log Out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarMui>
  );
}
export default AppBar;
