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
    const {user, isLoading} = useAuth();
    if(isLoading) return "Cargando..."
    return (

         <Link to={`${PROTECTED}/profile/${user?.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>Mi perfil</Link>
     
    )
}
function ActiveUserName() {
    const {user, isLoading} = useAuth();
    if(isLoading) return "Cargando..."
    return (
        <Typography textAlign="center" color="white" marginInlineEnd="10px">
            @{user?.username}
 </Typography>
     
    )
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
            <Avatar sx={{ width: 32, height: 32 }} src="/path/to/avatar.jpg">

            </Avatar>
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
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: "10px",
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
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        
      <MenuItem onClick={handleClose}>
        <Avatar /> <ActiveUserLink />
      {/* AQUI VA MI PERFIL */}
      </MenuItem>
        <Divider />

        <MenuItem onClick={logout} disabled={isLoading}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" htmlColor="#0F1A1D" color="#0F1A1D"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
