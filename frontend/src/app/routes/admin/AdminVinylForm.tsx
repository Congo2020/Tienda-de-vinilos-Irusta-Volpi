import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vinylSchema, VinylFormData } from '../../validators/vinyl.schema';
import { vinylService } from '../../services/vinyl.service';
import { Vinyl } from '../../types/vinyl.types';
import { VINYL_GENRES } from '../../types/constants';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export const AdminVinylForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<VinylFormData>({
    resolver: zodResolver(vinylSchema),
  });

  useEffect(() => {
    if (id) {
      loadVinyl();
    }
  }, [id]);

  const loadVinyl = async () => {
    try {
      setLoading(true);
      const vinyl = await vinylService.getById(id!);
      setValue('title', vinyl.title);
      setValue('artist', vinyl.artist);
      setValue('price', vinyl.price);
      setValue('stock', vinyl.stock);
      setValue('year', vinyl.year);
      setValue('genres', vinyl.genres);
      setValue('cover_url', vinyl.cover_url);
      setValue('description', vinyl.description || '');
    } catch (error) {
      setError('Error al cargar el vinilo');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: VinylFormData) => {
    try {
      setError(null);
      if (isEdit) {
        await vinylService.update(id!, data);
      } else {
        await vinylService.create(data);
      }
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar el vinilo');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Editar Vinilo' : 'Nuevo Vinilo'}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Título"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Artista"
          {...register('artist')}
          error={!!errors.artist}
          helperText={errors.artist?.message}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Precio"
            {...register('price', { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            fullWidth
            type="number"
            label="Stock"
            {...register('stock', { valueAsNumber: true })}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />
          <TextField
            fullWidth
            type="number"
            label="Año"
            {...register('year', { valueAsNumber: true })}
            error={!!errors.year}
            helperText={errors.year?.message}
          />
        </Box>
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Géneros</InputLabel>
              <Select
                multiple
                value={field.value || []}
                onChange={field.onChange}
                input={<OutlinedInput label="Géneros" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {VINYL_GENRES.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
              {errors.genres && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                  {errors.genres.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <TextField
          fullWidth
          label="URL de Portada"
          {...register('cover_url')}
          error={!!errors.cover_url}
          helperText={errors.cover_url?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Descripción"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" size="large">
            {isEdit ? 'Actualizar' : 'Crear'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin')}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

