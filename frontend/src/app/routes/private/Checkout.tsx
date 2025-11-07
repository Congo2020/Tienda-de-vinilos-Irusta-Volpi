import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormData } from '../../validators/checkout.schema';
import { useCart } from '../../store/useCart';
import { orderService } from '../../services/order.service';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        items: items.map((item) => ({
          vinyl_id: item.vinyl.id,
          quantity: item.quantity,
        })),
        full_name: data.full_name,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code,
        phone: data.phone,
      };

      await orderService.create(orderData);
      clearCart();
      navigate('/orders');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al procesar la orden');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No hay items en el carrito
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
        Checkout
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información de Envío
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Nombre Completo"
                {...register('full_name')}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Dirección"
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Ciudad"
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Código Postal"
                {...register('postal_code')}
                error={!!errors.postal_code}
                helperText={errors.postal_code?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Teléfono"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            {items.map((item) => (
              <Box key={item.vinyl.id} sx={{ mb: 2 }}>
                <Typography variant="body1">{item.vinyl.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} x ${item.vinyl.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
              <Typography variant="h6">
                Total: ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

