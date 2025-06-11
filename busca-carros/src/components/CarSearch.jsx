// src/components/CarSearch.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Autocomplete, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllCars } from '../api/carApi';

export default function CarSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [selectedCarOption, setSelectedCarOption] = useState(null); // Renomeado para evitar conflito com 'selectedCar' de Home

  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      try {
        const responseData = await getAllCars();
        // Acessa .vehicles da resposta, conforme visto no console
        const cars = Array.isArray(responseData.vehicles) ? responseData.vehicles : [];

        const carNames = cars.map(car => ({
          id: car.id,
          label: `${car.brand_name} ${car.model_name} (${car.year?.release || car.year || 'N/A'})`
        }));
        setOptions(carNames);
      } catch (error) {
        console.error("Erro ao carregar opções de carros para Autocomplete:", error);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearch deve ser chamado com o ID do carro selecionado
    if (selectedCarOption) {
      onSearch(selectedCarOption.id);
    } else {
      // Se o usuário clicou em buscar sem selecionar nada,
      // ou limpou o campo, podemos chamar onSearch com null/undefined
      // para que Home.jsx exiba a lista completa novamente
      onSearch(null);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        alignItems: 'center',
        flexWrap: { xs: 'wrap', sm: 'nowrap' }
      }}
    >
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        loading={loadingOptions}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={selectedCarOption} // Usa o novo estado
        onChange={(event, newValue) => {
          setSelectedCarOption(newValue);
          // Se o usuário selecionou uma opção, já aciona a busca
          if (newValue) {
            onSearch(newValue.id);
          } else {
            // Se o usuário limpou a seleção no Autocomplete, também aciona a busca vazia
            onSearch(null);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Carro"
            placeholder="Digite o modelo ou marca do carro"
            variant="outlined"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '& input[type=number]': {
                '-moz-appearance': 'textfield',
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
              ),
              endAdornment: (
                <>
                  {loadingOptions ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<SearchIcon />}
        sx={{
          minWidth: { xs: '100%', sm: '120px' },
          height: '56px',
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }
        }}
        disabled={loadingOptions}
      >
        Buscar
      </Button>
    </Box>
  );
}