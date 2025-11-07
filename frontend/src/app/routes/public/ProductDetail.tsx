import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  TextField,
  Alert,
} from '@mui/material';
import { vinylService } from '../../services/vinyl.service';
import { Vinyl } from '../../types/vinyl.types';
import { useCart } from '../../store/useCart';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [vinyl, setVinyl] = useState<Vinyl | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      loadVinyl();
    }
  }, [id]);

  const loadVinyl = async () => {
    try {
      setLoading(true);
      const data = await vinylService.getById(id!);
      setVinyl(data);
    } catch (error) {
      setError('Error al cargar el vinilo');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!vinyl) return;
    
    if (quantity > vinyl.stock) {
      setError('No hay suficiente stock disponible');
      return;
    }

    addItem(vinyl, quantity);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <LoadingSpinner />;
  if (!vinyl) return <Typography>Vinilo no encontrado</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <img
            src={vinyl.cover_url}
            alt={vinyl.title}
            style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" gutterBottom>
            {vinyl.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {vinyl.artist}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Año: {vinyl.year}
          </Typography>
          <Box sx={{ my: 2 }}>
            {vinyl.genres.map((genre) => (
              <Chip key={genre} label={genre} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          {vinyl.description && (
            <Typography variant="body1" paragraph>
              {vinyl.description}
            </Typography>
          )}
          <Typography variant="h4" color="primary" gutterBottom>
            ${vinyl.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Stock disponible: {vinyl.stock}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Agregado al carrito!
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center' }}>
            <TextField
              type="number"
              label="Cantidad"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: vinyl.stock }}
              sx={{ width: '100px' }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={vinyl.stock === 0}
            >
              Agregar al Carrito
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

