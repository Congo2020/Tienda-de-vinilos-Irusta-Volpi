import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { orderService } from '../../services/order.service';
import { Order } from '../../types/order.types';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">No tenés pedidos aún</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Pedidos
      </Typography>
      {orders.map((order) => (
        <Paper key={order.id} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Pedido #{order.id.slice(-8)}</Typography>
            <Chip label={order.status} color="primary" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Fecha: {new Date(order.created_at).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: ${order.total.toFixed(2)}
          </Typography>
          <TableContainer sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Vinilo</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.vinyl_id}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Container>
  );
};

