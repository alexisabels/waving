import { Box, Button, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import AccountMenu from './AccountMenu'; // Asegúrate de que esta ruta sea la correcta para importar AccountMenu
import { PROTECTED } from "../../lib/routes";

export default function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <Box
      sx={{
        boxShadow: 1,
        position: "fixed",
        width: "100%",
        borderColor: "#0F1A1D",
        height: 64,
        zIndex: 3,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#0F1A1D",
        
      }}
    >
      <Link
        component={NavLink}
        to={`${PROTECTED}/home`}
        sx={{
          color: "#FFFF",
          fontWeight: "bold",
          textDecoration: "none",
          fontSize: '1.3rem'
        }}
      >
        Waving
      </Link>
      
      <AccountMenu />
    </Box>
  );
}
