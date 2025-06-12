// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importe ThemeProvider e createTheme
import CssBaseline from '@mui/material/CssBaseline'; // Importe CssBaseline para resetar estilos CSS

// Define o tema com sua cor primária azul
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Um azul vibrante (MUI blue 500)
    },
    secondary: {
      main: '#42a5f5', // Um azul mais claro para secundário
    },
    background: {
      default: '#f0f2f5', // A cor de fundo geral da página
      paper: '#ffffff', // Cor de fundo para Cards, Dialogs, etc.
    },
    text: {
      primary: '#333333', // Cor padrão do texto
      secondary: '#555555', // Cor para textos secundários
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Garante que sua fonte seja aplicada
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordas arredondadas para todos os botões MUI por padrão
          textTransform: 'none', // Remove uppercase padrão dos botões
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)', // Sombra mais sutil
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}> {/* Envolve com ThemeProvider */}
        <CssBaseline /> {/* Para um reset de CSS consistente */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);