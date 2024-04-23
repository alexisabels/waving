import { Box, Link, Stack, SvgIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountMenu from './AccountMenu'; // Asegúrate de que esta ruta sea la correcta para importar AccountMenu
import { PROTECTED } from "../../lib/routes";
import WavesIcon from '@mui/icons-material/Waves';
import WaveLogo from "../../assets/img/WaveLogo";

export default function Navbar() {

  return (
    <Box sx={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EBE3DD",
      position: 'sticky',
      top: 0,
      zIndex: 3,  pt: 1,
      display: "flex",
   

    }}>
    <Box
      sx={{
        borderRadius: 5,
      
        width: "97%",
        borderColor: "#223C43",
        height: 64,

        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#223C43",
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
        <Stack alignItems="center" direction="row" gap={1}>

        <WaveLogo />
        Waving
        </Stack>

      </Link>
      <AccountMenu />
    </Box>
    </Box>
  );
}
