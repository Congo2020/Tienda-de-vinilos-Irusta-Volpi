import React from 'react';
import { Grid } from '@mui/material';
import { Vinyl } from '../../types/vinyl.types';
import { VinylCard } from './VinylCard';

interface VinylGridProps {
  vinyls: Vinyl[];
}

export const VinylGrid: React.FC<VinylGridProps> = ({ vinyls }) => {
  return (
    <Grid container spacing={3}>
      {vinyls.map((vinyl) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={vinyl.id}>
          <VinylCard vinyl={vinyl} />
        </Grid>
      ))}
    </Grid>
  );
};

