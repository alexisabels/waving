import * as React from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth, useLogout } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";

function ActiveUserLink() {
  const { user, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  return (
    <Link
      to={`${PROTECTED}/profile/${user?.username}`}
      style={{ color: "inherit", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bolder"
       }}
    >
      Mi perfil
    </Link>
  );
}
function ActiveUserName() {
  const { user, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  return (
    <Typography textAlign="center" color="white" marginInlineEnd="10px">
      @{user?.username}
    </Typography>
  );
}
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout, isLoading } = useLogout();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Ajustes de cuenta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ActiveUserName />

            {/* Asegúrate de que la URL de la imagen del avatar sea la correcta */}
            <Avatar
              sx={{ width: 32, height: 32, color: "black" }}
              src="../../assets/img/ocean.jpg"
              
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "rgb(187, 187, 187)",
            width: 175,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 3,
            borderRadius: "25px",
            px: 1,

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              backgroundColor: "rgb(187, 187, 187)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            "&:hover": {
              borderRadius: "25px", // Esto aplica border-radius a los items al hacer hover
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Opcional: puedes cambiar el color de fondo al hacer hover si así lo deseas
            },
          }}
        >
          {" "}
          <Avatar src="../../assets/img/ocean.jpg" sx={{ width: 32, height: 32, color: "black" }}/> <ActiveUserLink />
          {/* AQUI VA MI PERFIL */}
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={logout}
          disabled={isLoading}
          sx={{
            pt: "10x",
            pb: "9.2px",
            "&:hover": {
            border: "rgba(0, 0, 0, 4)",
              borderRadius: "25px", // Esto aplica border-radius a los items al hacer hover
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Opcional: puedes cambiar el color de fondo al hacer hover si así lo deseas
            },
            color: "inherit", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bolder"
          }}
          
        
        >
          <ListItemIcon>
            <LogoutIcon fontSize="medium" htmlColor="#0F1A1D" color="#0F1A1D" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
