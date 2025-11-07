import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { vinylService } from '../../services/vinyl.service';
import { Vinyl } from '../../types/vinyl.types';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVinyls();
  }, []);

  const loadVinyls = async () => {
    try {
      setLoading(true);
      const data = await vinylService.getAll();
      setVinyls(data);
    } catch (error) {
      console.error('Error loading vinyls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este vinilo?')) return;
    
    try {
      await vinylService.delete(id);
      loadVinyls();
    } catch (error) {
      console.error('Error deleting vinyl:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Panel de Administración</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/vinyls/new')}>
          Nuevo Vinilo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Portada</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vinyls.map((vinyl) => (
              <TableRow key={vinyl.id}>
                <TableCell>
                  <img
                    src={vinyl.cover_url}
                    alt={vinyl.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{vinyl.title}</TableCell>
                <TableCell>{vinyl.artist}</TableCell>
                <TableCell>${vinyl.price.toFixed(2)}</TableCell>
                <TableCell>{vinyl.stock}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/admin/vinyls/${vinyl.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(vinyl.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

