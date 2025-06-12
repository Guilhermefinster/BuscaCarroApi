// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import CarSearch from '../components/CarSearch';
import CarListContainer from '../components/CarListContainer';
import { getAllCars } from "../api/carApi.js";
import { Container, Typography, Box, Alert, CircularProgress, Stack } from "@mui/material";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [erro, setErro] = useState('');
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchInitialCars = async () => {
      setLoadingInitial(true);
      setErro('');
      console.log("Home: Iniciando fetchInitialCars...");
      try {
        const responseData = await getAllCars();
        console.log("Home: Dados de getAllCars recebidos:", responseData);

        if (responseData && Array.isArray(responseData.vehicles)) {
            setAllCars(responseData.vehicles);
            // NÃO SETA filteredCars aqui, para não exibir a lista inicial
            console.log("Home: allCars atualizados a partir de responseData.vehicles.");
        } else if (Array.isArray(responseData)) {
            setAllCars(responseData);
            // NÃO SETA filteredCars aqui
            console.log("Home: allCars atualizados (array direto).");
        } else {
            setAllCars([]);
            setFilteredCars([]); // Garante que filteredCars esteja vazio se a API falhar
            setErro('A API não retornou uma lista de carros válida ou o formato está incorreto.');
            console.warn("Home: getAllCars retornou dados inesperados ou formato inválido:", responseData);
        }
      } catch (err) {
        setErro('Erro ao carregar a lista de carros. Tente novamente mais tarde.');
        console.error("Home: Erro no fetchInitialCars:", err);
      } finally {
        setLoadingInitial(false);
        console.log("Home: fetchInitialCars finalizado. Loading:", false);
      }
    };
    fetchInitialCars();
  }, []);

  const handleSearch = (selectedOptionId) => {
    setErro('');
    if (selectedOptionId) {
        const foundCar = allCars.find(car => car.id === selectedOptionId);
        if (foundCar) {
            setFilteredCars([foundCar]); // Exibe apenas o carro selecionado
            console.log("Home: Carro selecionado para busca e filtrado:", foundCar);
        } else {
            setFilteredCars([]); // Limpa a lista se o carro não for encontrado
            setErro('Carro selecionado não encontrado na lista original.');
            console.warn("Home: Carro selecionado não encontrado para ID:", selectedOptionId);
        }
    } else {
        setFilteredCars([]); // Zera a lista se a busca for limpa
        console.log("Home: Busca limpa, não mostrando carros.");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 4,
          textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        Encontre Seu Carro Ideal
      </Typography>

      <Stack spacing={3}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: 'text.secondary', borderBottom: '1px solid #eee', pb: 1, mb: 3 }}
          >
            Buscar Carro
          </Typography>
          <CarSearch onSearch={handleSearch} />

          {loadingInitial && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} color="primary" />
              <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>Carregando carros...</Typography>
            </Box>
          )}
          {erro && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 1 }}>
              {erro}
            </Alert>
          )}
        </Box>

        {/* MANTÉM A SEÇÃO DE RESULTADOS DA BUSCA, mas só exibe se filteredCars não estiver vazio */}
        { !loadingInitial && filteredCars.length > 0 && (
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, mt: 2 }}>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ color: 'text.secondary', borderBottom: '1px solid #eee', pb: 1, mb: 3 }}
                >
                    Resultados:
                </Typography>
                <CarListContainer carros={filteredCars} />
            </Box>
        )}

        { !loadingInitial && filteredCars.length === 0 && !erro && ( // Adiciona mensagem se não houver resultados e não houver erro
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, mt: 2 }}>
                <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mt: 2 }}>
                    Nenhum carro encontrado. Use a busca acima.
                </Typography>
            </Box>
        )}
      </Stack>
    </Container>
  );
}