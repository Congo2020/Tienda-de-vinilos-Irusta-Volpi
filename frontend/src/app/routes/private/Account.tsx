import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useAuth } from '../../store/useAuth';

export const Account: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mi Cuenta
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            <strong>Nombre:</strong> {user?.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Rol:</strong> {user?.role}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

