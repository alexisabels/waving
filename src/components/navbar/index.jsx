import { Box, Link, Stack, SvgIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountMenu from './AccountMenu'; // Asegúrate de que esta ruta sea la correcta para importar AccountMenu
import { PROTECTED } from "../../lib/routes";
import WavesIcon from '@mui/icons-material/Waves';

export default function Navbar() {

  return (
    <Box
      sx={{
        boxShadow: 1,
        width: "100%",
        borderColor: "#223C43",
        height: 64,
        zIndex: 3,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#223C43",
        position: 'sticky',
        top: 0,

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

        <WavesIcon />
        Waving
        </Stack>

      </Link>
      <AccountMenu />
    </Box>
  );
}
