import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { VinylFilters } from '../../types/vinyl.types';
import { VINYL_GENRES } from '../../types/constants';

interface FiltersProps {
  filters: VinylFilters;
  onFiltersChange: (filters: VinylFilters) => void;
  onReset: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, onReset }) => {
  const handleChange = (field: keyof VinylFilters, value: string | number | undefined) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Búsqueda"
            value={filters.q || ''}
            onChange={(e) => handleChange('q', e.target.value)}
            placeholder="Título o artista..."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Género"
            value={filters.genre || ''}
            onChange={(e) => handleChange('genre', e.target.value || undefined)}
          >
            <MenuItem value="">Todos</MenuItem>
            {VINYL_GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Precio Mín"
            value={filters.minPrice || ''}
            onChange={(e) =>
              handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Precio Máx"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="outlined" fullWidth onClick={onReset}>
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

