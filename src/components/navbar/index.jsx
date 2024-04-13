import { Box, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";

export default function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <Box
      sx={{
        boxShadow: 1,
        position: "fixed",
        width: "100%",
        borderTop: "6px solid",
        borderColor: teal[400],
        height: 64,
        zIndex: 3,
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        backgroundColor: "white",
        px: 2
      }}
    >
      <Link
        component={NavLink}
        to="/home"
        sx={{
          color: teal[500],
          fontWeight: "bold",
          textDecoration: "none",
          fontFamily: 'Roboto, sans-serif', // Aplica la fuente Roboto aquí
          fontSize: '1rem' // Puedes ajustar el tamaño de la fuente según necesites
        }}
      >
        Home
      </Link>
      <Button 
        variant="contained" 
        onClick={logout}
        color="primary"
        disabled={isLoading}
      
      >
        Cerrar sesión
      </Button>
    </Box>
  );
}
