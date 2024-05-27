/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Avatar,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/user";

function EditProfileModal({ open, handleClose, currentUserId }) {
  const { user, updateUser, updateAvatar } = useUser(currentUserId);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null); // Nuevo estado para URL del avatar
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setAvatarURL(user.avatar || null); // Inicializar URL del avatar
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newAvatarURL = URL.createObjectURL(file);
      setAvatarURL(newAvatarURL); // Actualizar la URL del avatar
      updateAvatar(file).then(() => {
        URL.revokeObjectURL(newAvatarURL); // Liberar la URL del objeto después de cargar
      });
    }
  };

  const handleSave = async () => {
    if (username.length > 12) {
      alert("El nombre de usuario no puede tener más de 12 caracteres");
      return;
    }
    if (username) {
      await updateUser({ username });
      handleClose();
      navigate(`/protected/profile/${username}`, { replace: true });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Editar perfil
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <Box
              sx={{
                position: "relative",
                "&:hover .overlay": {
                  cursor: "pointer",
                  opacity: 1,
                },
              }}
            >
              <Avatar
                src={avatarURL} // Usar el nuevo estado de URL del avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#223C43",
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  borderRadius: "50%",
                }}
              >
                <Edit sx={{ color: "white" }} />
              </Box>
            </Box>
          </label>
          <Typography variant="subtitle1" gutterBottom>
            Sube un nuevo avatar
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            margin="normal"
            label="Nombre de usuario"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#223C43",
                },
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: "#223C43",
              },
              bgcolor: "white",
            }}
          />
          <Typography variant="body2" align="center">
            ¿Quieres cambiar tu correo o tu contraseña? Ve a la{" "}
            <Link
              to="/protected/ajustes"
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              página de ajustes
            </Link>
            .
          </Typography>
          <Typography
            variant="body2"
            fontSize="small"
            fontWeight="lighter"
            align="center"
          >
            Es posible que debas recargar la página para ver los cambios
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              color: "#223C43",
              borderColor: "#223C43",
              "&:hover": {
                borderColor: "#1b2e36",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              bgcolor: "#223C43",
              "&:hover": {
                bgcolor: "#1b2e36",
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
