import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingPage() {
  return (
    <Box sx={{
      display: 'flex',       // Use flex layout
      flexDirection: 'column', // Stack children vertically
      justifyContent: 'center', // Center vertically
      alignItems: 'center',     // Center horizontally
      height: '100vh',          // Full viewport height
      width: '100vw'            // Full viewport width
    }}>
      <CircularProgress color="primary" size={40} /> {/* Spinner size adjusted */}
      <Typography  sx={{ marginTop: 2 }}>Cargando...</Typography> {/* Text below spinner */}
    </Box>
  );
}
