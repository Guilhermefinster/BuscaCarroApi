// src/pages/CarDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../api/carApi';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carro, setCarro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getCarById(id);
        if (data) {
          setCarro(data);
        } else {
          setError('Carro não encontrado.');
        }
      } catch (err) {
        setError('Ocorreu um erro ao carregar os detalhes do carro.');
        console.error("Erro ao buscar detalhes do carro:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    } else {
      setError('ID do carro não fornecido na URL.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" mt={2}>Carregando detalhes do carro...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para a Busca
        </Button>
      </Container>
    );
  }

  if (!carro) {
    return (
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Alert severity="info">Nenhum carro encontrado para o ID {id}.</Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Voltar para a Busca
        </Button>
      </Container>
    );
  }

  const {
    brand_name = 'Marca Desconhecida',
    model_name = 'Modelo Desconhecido',
    price,
    fuel_name = 'N/A',
    transmission_name = 'N/A',
    bodywork = 'N/A',
    doors = 'N/A',
    version = 'N/A',
    images = [],
    year,
    comfort = {},
    entertainment = {}
  } = carro;

  const displayYear = year
    ? (typeof year === 'object' && year !== null
        ? `${year.release || 'N/A'}${year.production && year.production !== year.release ? ` (Prod: ${year.production})` : ''}`
        : year)
    : 'N/A';

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        bgcolor: 'background.paper', // Usa a cor de fundo de "papel" do tema
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <IconButton onClick={() => navigate('/')} sx={{ mb: 2, color: 'primary.main' }}>
        <ArrowBackIcon />
        <Typography variant="body1" sx={{ ml: 1 }}>Voltar para a Busca</Typography>
      </IconButton>

      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}
      >
        Detalhes do {brand_name} {model_name}
      </Typography>

      {images.length > 0 && (
        <Box sx={{ width: '100%', maxHeight: 400, overflow: 'hidden', borderRadius: '8px', mb: 4, display: 'flex', justifyContent: 'center' }}>
          <img
            src={images[0]}
            alt={`${brand_name} ${model_name}`}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>Informações Principais:</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Preço:</strong> R$ {price ? parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Ano:</strong> {displayYear}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Combustível:</strong> {fuel_name}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Transmissão:</strong> {transmission_name}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Carroceria:</strong> {bodywork}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Portas:</strong> {doors}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}><strong>Versão:</strong> {version}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>Conforto:</Typography>
          <ul>
            {Object.entries(comfort).length > 0 ? (
              Object.entries(comfort).map(([key, val]) => (
                <li key={key}>
                  <Typography variant="body1" color="text.secondary">
                    {key.replace(/_/g, ' ')}: <strong>{val ? 'Sim' : 'Não'}</strong>
                  </Typography>
                </li>
              ))
            ) : (
              <li><Typography variant="body1" color="text.secondary">Nenhuma informação de conforto disponível.</Typography></li>
            )}
          </ul>

          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mt: 3, mb: 2 }}>Entretenimento:</Typography>
          <ul>
            {Object.entries(entertainment).length > 0 ? (
              Object.entries(entertainment).map(([key, val]) => (
                <li key={key}>
                  <Typography variant="body1" color="text.secondary">
                    {key.replace(/_/g, ' ')}: <strong>{val ? 'Sim' : 'Não'}</strong>
                  </Typography>
                </li>
              ))
            ) : (
              <li><Typography variant="body1" color="text.secondary">Nenhuma informação de entretenimento disponível.</Typography></li>
            )}
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
}