import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../store/useCart';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button variant="contained" onClick={() => navigate('/vinyls')}>
          Explorar Catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vinilo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.vinyl.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img
                      src={item.vinyl.cover_url}
                      alt={item.vinyl.title}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <Box>
                      <Typography variant="body1">{item.vinyl.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.vinyl.artist}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>${item.vinyl.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.vinyl.id, item.quantity - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.vinyl.id, item.quantity + 1)}
                      disabled={item.quantity >= item.vinyl.stock}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.vinyl.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => removeItem(item.vinyl.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/checkout')}
        >
          Proceder al Checkout
        </Button>
      </Box>
    </Container>
  );
};

