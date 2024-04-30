import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#EBE3DD",
      }}
    >
      <CircularProgress sx={{ color: "#223C43" }} size={40} />
      <Typography sx={{ marginTop: 2 }}>Cargando...</Typography>
    </Box>
  );
}
