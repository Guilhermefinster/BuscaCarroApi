// src/components/CarDetails.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CarDetails({ open, onClose, carro }) {
  if (!carro) return null;

  // Garantir que as propriedades aninhadas existem para evitar erros
  const comfortFeatures = carro.comfort || {};
  const entertainmentFeatures = carro.entertainment || {};

  // Determinar o ano a ser exibido no modal
  const displayYear = carro.year
    ? (typeof carro.year === 'object' && carro.year !== null
        ? `${carro.year.release || 'N/A'}${carro.year.production && carro.year.production !== carro.year.release ? ` (Prod: ${carro.year.production})` : ''}`
        : carro.year)
    : 'N/A';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' } }}
    >
      <DialogTitle sx={{ bgcolor: '#f5f5f5', borderBottom: '1px solid #eee', p: 3 }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: 600, color: '#333' }}>
          Detalhes do {carro.brand_name} {carro.model_name}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {carro.images && carro.images.length > 0 && (
          <Box sx={{ width: '100%', maxHeight: 300, overflow: 'hidden', borderRadius: '8px', mb: 3 }}>
            <img
              src={carro.images[0]}
              alt={`${carro.brand_name} ${carro.model_name}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#444' }}>Informações Principais:</Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Preço:</strong> R$ {carro.price ? parseFloat(carro.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary"><strong>Ano:</strong> {displayYear}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Combustível:</strong> {carro.fuel_name || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Transmissão:</strong> {carro.transmission_name || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Carroceria:</strong> {carro.bodywork || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Portas:</strong> {carro.doors || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Versão:</strong> {carro.version || 'N/A'}</Typography>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#444' }}>Conforto:</Typography>
            <ul>
              {Object.entries(comfortFeatures).length > 0 ? (
                Object.entries(comfortFeatures).map(([key, val]) => (
                  <li key={key}>
                    <Typography variant="body2" color="text.secondary">
                      {key.replace(/_/g, ' ')}: <strong>{val ? 'Sim' : 'Não'}</strong>
                    </Typography>
                  </li>
                ))
              ) : (
                <li><Typography variant="body2" color="text.secondary">Nenhuma informação de conforto disponível.</Typography></li>
              )}
            </ul>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#444', mt: 2 }}>Entretenimento:</Typography>
            <ul>
              {Object.entries(entertainmentFeatures).length > 0 ? (
                Object.entries(entertainmentFeatures).map(([key, val]) => (
                  <li key={key}>
                    <Typography variant="body2" color="text.secondary">
                      {key.replace(/_/g, ' ')}: <strong>{val ? 'Sim' : 'Não'}</strong>
                    </Typography>
                  </li>
                ))
              ) : (
                <li><Typography variant="body2" color="text.secondary">Nenhuma informação de entretenimento disponível.</Typography></li>
              )}
            </ul>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}