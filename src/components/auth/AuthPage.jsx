import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

import Register from './Register'
import Login from './Login';
import { Link } from 'react-router-dom';
import ocean from '../../assets/img/ocean.jpg'
import texture from '../../assets/img/texture.png'
import './AuthPage.css'
const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: 'primary.white',
    }}>
      {/* Omitir la sección gráfica en móviles */}
      {!isMobile && (
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${ocean})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
       <Typography
  variant="h2"
  component="div"
  sx={{
    color: 'white',
    userSelect: 'none', // Standard
    WebkitUserSelect: 'none', // Chrome, Safari, and Opera
    msUserSelect: 'none', // Internet Explorer
    MozUserSelect: 'none', // Firefox
  }}
>
  Hola!
</Typography>
        </Box>
      )}

      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${texture})`,

      }}>
        <Box sx={{ width: { xs: '80%', md: '400px' } }}>
          {isRegistered ? (
            <Login onToggleForm={() => setIsRegistered(false)} />
          ) : (
            <Register onToggleForm={() => setIsRegistered(true)} />
          )}
        
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
