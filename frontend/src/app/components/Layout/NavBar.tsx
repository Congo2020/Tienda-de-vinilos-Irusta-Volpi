import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../store/useAuth';
import { useCart } from '../../store/useCart';

export const NavBar: React.FC = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          🎵 Vinyl Store
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/vinyls">
            Catálogo
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/cart">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" component={Link} to="/orders">
                Mis Pedidos
              </Button>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user?.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Salir
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

