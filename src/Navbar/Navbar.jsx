import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const pages = ['Menu', 'Cart'];

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  return (
    <AppBar position="fixed" sx={ { background: 'black' } }>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={ { display: { xs: 'none', md: 'flex' }, mr: 1 } } />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={ {
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            } }
          >
            SS Restaurant
          </Typography>

          <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={ handleOpenNavMenu }
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorElNav }
              anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'left',
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'left',
              } }
              open={ Boolean(anchorElNav) }
              onClose={ handleCloseNavMenu }
              sx={ {
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
                marginRight: '30px'
              } }
            >

              <MenuItem onClick={ () => navigate('/menu') }>
                <Typography textAlign="center">Menu</Typography>
              </MenuItem>

              <MenuItem onClick={ () => navigate('/cart') }>
                <Typography textAlign="center">Cart</Typography>
              </MenuItem>


            </Menu>
          </Box>
          <AdbIcon sx={ { display: { xs: 'flex', md: 'none' }, mr: 1 } } />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={ {
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            } }
          >
            SS Restaurant
          </Typography>
          <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', marginRight: '30px' } }>

            <Button
              onClick={ () => navigate('/') }
              sx={ { my: 2, color: 'white', display: 'block' } }
            >
              Home
            </Button>
            <Button
              onClick={ () => navigate('/menu') }
              sx={ { my: 2, color: 'white', display: 'block' } }
            >
              Menu
            </Button>
            <Button
              onClick={ () => navigate('/cart') }
              sx={ { my: 2, color: 'white', display: 'block' } }
            >
              Cart
            </Button>

          </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
