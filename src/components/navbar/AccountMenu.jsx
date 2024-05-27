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
  Zoom,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth, useLogout } from "../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import avatarexample from "./../../../public/assets/img/avatarexample.png";

function ActiveUserLink() {
  const { user, isLoading } = useAuth();
  if (isLoading)
    return (
      <Typography
        textAlign="center"
        style={{
          color: "inherit",
          textDecoration: "none",
          fontSize: "1.2rem",
          fontWeight: "bolder",
        }}
      >
        Cargando...
      </Typography>
    );
  return (
    <Link
      to={`${PROTECTED}/profile/${user?.username}`}
      style={{
        color: "inherit",
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: "bolder",
      }}
    >
      Mi perfil
    </Link>
  );
}
function ActiveUserName() {
  const { user, isLoading } = useAuth();
  if (isLoading)
    return (
      <Typography textAlign="center" color="white" marginInlineEnd="10px">
        Cargando...
      </Typography>
    );
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
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
    navigate(`${PROTECTED}/profile/${user?.username}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Ajustes de cuenta" TransitionComponent={Zoom}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ActiveUserName />

            <Avatar
              sx={{ width: 38, height: 38, color: "black" }}
              src={user?.avatar}
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
            backgroundColor: "rgb(230, 230, 230)",
            width: 175,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.22))",
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
              backgroundColor: "rgb(230, 230, 230)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleMenuItemClick}
          sx={{
            color: "rgba(0, 0, 0, 0.6)",

            "&:hover": {
              color: "inherit",
              borderRadius: "25px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{ width: 32, height: 32, color: "black" }}
          />
          <ActiveUserLink />
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={logout}
          disabled={isLoading}
          sx={{
            pt: "10x",
            pb: "9.2px",
            color: "rgba(0, 0, 0, 0.6)",

            "&:hover": {
              color: "inherit",

              border: "rgba(0, 0, 0, 4)",
              borderRadius: "25px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bolder",
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="medium" htmlColor="#223C43" color="#223C43" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
