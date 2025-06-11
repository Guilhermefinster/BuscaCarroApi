// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarDetailsPage from './pages/CarDetailsPage.jsx';
import Footer from './components/Footer.jsx'; // Importe o componente Footer
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Ítens empilhados verticalmente
        minHeight: '100vh',     // Ocupa toda a altura da viewport
        width: '100vw',         // Ocupa toda a largura
        bgcolor: 'background.default', // Usa a cor de fundo definida no tema
        boxSizing: 'border-box',
        // Remova padding aqui se o footer e o conteúdo principal já tiverem seus próprios paddings
      }}
    >
      {/* Conteúdo principal (páginas) */}
      <Box
        sx={{
          flexGrow: 1, // Faz este Box preencher o espaço restante, empurrando o footer para baixo
          display: 'flex',
          justifyContent: 'center', // Centraliza o conteúdo horizontalmente
          alignItems: 'flex-start', // Alinha o conteúdo ao topo dentro do flex container
          width: '100%',
          py: 4, // Padding vertical para o conteúdo principal
        }}
      >
        <Box // Container interno para limitar a largura máxima do conteúdo das páginas
          sx={{
            maxWidth: 'md',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetailsPage />} />
          </Routes>
        </Box>
      </Box>

      <Footer /> {/* Renderiza o rodapé */}
    </Box>
  );
}

export default App;