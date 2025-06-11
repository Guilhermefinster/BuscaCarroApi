// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#212121', // Cor de fundo escura para o rodapé
        color: '#ffffff', // Cor do texto
        py: 4, // Padding vertical
        px: 2, // Padding horizontal
        mt: 'auto', // Empurra o rodapé para o final da página
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" mb={1}>
          Desenvolvido por Guilherme Aniba - Dev
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#bdbdbd' }}>
          © {new Date().getFullYear()} Catálogo de Carros. Todos os direitos reservados.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="https://github.com/SeuUsuario/SeuRepositorio" target="_blank" rel="noopener" color="inherit" sx={{ mx: 1 }}>
            <GitHubIcon sx={{ fontSize: 24, '&:hover': { color: 'primary.light' } }} />
          </Link>
          {/* Adicione outros links de redes sociais ou contato aqui */}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;