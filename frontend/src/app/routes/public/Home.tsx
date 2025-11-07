import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2,
          color: 'white',
          mb: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          🎵 Bienvenido a Vinyl Store
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Descubrí la mejor colección de vinilos clásicos
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/vinyls"
          sx={{ backgroundColor: 'white', color: '#667eea', '&:hover': { backgroundColor: '#f5f5f5' } }}
        >
          Explorar Catálogo
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Vinilos Destacados
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora nuestra colección de vinilos icónicos de todos los tiempos
        </Typography>
      </Box>
    </Container>
  );
};

