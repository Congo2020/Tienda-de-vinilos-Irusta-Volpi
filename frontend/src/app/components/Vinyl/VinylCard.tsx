import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Vinyl } from '../../types/vinyl.types';
import { useNavigate } from 'react-router-dom';

interface VinylCardProps {
  vinyl: Vinyl;
}

export const VinylCard: React.FC<VinylCardProps> = ({ vinyl }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="300"
        image={vinyl.cover_url}
        alt={vinyl.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {vinyl.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {vinyl.artist} ({vinyl.year})
        </Typography>
        <Box sx={{ mb: 2 }}>
          {vinyl.genres.slice(0, 2).map((genre) => (
            <Chip key={genre} label={genre} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
          ${vinyl.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {vinyl.stock}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate(`/vinyls/${vinyl.id}`)}
        >
          Ver Detalles
        </Button>
      </CardContent>
    </Card>
  );
};

