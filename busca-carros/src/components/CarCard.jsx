// src/components/CarCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CarCard.module.css';

function CarCard({ carro }) {
  const navigate = useNavigate();
  console.log("CarCard: Renderizando para carro:", carro); // Mantenha este log
  if (!carro) {
    console.warn("CarCard: 'carro' é nulo ou indefinido ao tentar renderizar.");
    return null;
  }

  const {
    id,
    brand_name = 'Marca Desconhecida',
    model_name = 'Modelo Desconhecido',
    year,
    version = 'Não Informado',
    images = []
  } = carro;

  const displayYear = year
    ? (typeof year === 'object' && year !== null ? year.release || 'N/A' : year)
    : 'N/A';

  const handleDetailsClick = () => {
    navigate(`/car/${id}`);
  };

  return (
    <Card
      sx={{
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        bgcolor: 'background.paper'
      }}
    >
      <CardContent sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {images.length > 0 ? (
          <Box sx={{ width: '100%', maxHeight: 180, overflow: 'hidden', borderRadius: '8px', mb: 2 }}>
            <img
              src={images[0]}
              alt={`${brand_name} ${model_name}`}
              className={styles.cardImage}
            />
          </Box>
        ) : (
          <Box className={styles.noImage} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Imagem Não Disponível</Typography>
          </Box>
        )}

        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
          {brand_name} {model_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Ano: {displayYear}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Versão: {version}
        </Typography>

        <Button
          variant="contained"
          onClick={handleDetailsClick}
          sx={{
            mt: 'auto',
            borderRadius: '20px',
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          Mais detalhes
        </Button>
      </CardContent>
    </Card>
  );
}

export default CarCard;