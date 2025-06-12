// src/components/CarListContainer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import CarCard from './CarCard';

export default function CarListContainer({ carros }) {
  if (!carros || carros.length === 0) {
    return (
      <Typography variant="body1" mt={2} align="center" sx={{ color: 'text.secondary' }}>
        Nenhum carro encontrado para exibir.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fill, minmax(280px, 1fr))',
          md: 'repeat(auto-fill, minmax(300px, 1fr))',
        },
        gap: '24px',
        mt: 3,
        justifyContent: 'center'
      }}
    >
      {carros.map((carro) => (
        <CarCard key={carro.id} carro={carro} />
      ))}
    </Box>
  );
}