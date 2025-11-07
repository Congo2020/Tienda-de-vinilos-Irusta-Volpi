import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { VinylFilters } from '../../types/vinyl.types';
import { vinylService } from '../../services/vinyl.service';
import { Vinyl } from '../../types/vinyl.types';
import { VinylGrid } from '../../components/Vinyl/VinylGrid';
import { Filters } from '../../components/Vinyl/Filters';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';

export const Catalog: React.FC = () => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VinylFilters>({});

  useEffect(() => {
    loadVinyls();
  }, [filters]);

  const loadVinyls = async () => {
    try {
      setLoading(true);
      const data = await vinylService.getAll(filters);
      setVinyls(data);
    } catch (error) {
      console.error('Error loading vinyls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: VinylFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Vinilos
      </Typography>
      <Filters filters={filters} onFiltersChange={handleFiltersChange} onReset={handleReset} />
      {loading ? <LoadingSpinner /> : <VinylGrid vinyls={vinyls} />}
    </Container>
  );
};

