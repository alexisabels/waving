import { useState } from "react";
import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AlternateEmail, Close, Key } from "@mui/icons-material";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { emailValidate } from "../../../utils/form-validate"; // Asegúrate de que la ruta es correcta

export default function UpdateEmail() {
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState(""); // Estado para la contraseña

  const handleUpdateEmail = () => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password); // Credenciales actuales

    const reauthAndUpdate = () => {
      updateEmail(user, newEmail)
        .then(() => {
          setMsg("Correo actualizado correctamente.");
          setOpen(true);
        })
        .catch((error) => {
          setMsg(`Ha ocurrido un error: ${error.message}`);
          setOpen(true);
        });
    };

    if (!newEmail.match(emailValidate.pattern.value)) {
      setMsg(emailValidate.pattern.message);
      setOpen(true);
      return;
    }

    reauthenticateWithCredential(user, credential)
      .then(reauthAndUpdate)
      .catch((error) => {
        setMsg("Reautenticación necesaria: " + error.message);
        setOpen(true);
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "regular" }}>
        Cambiar correo asociado a la cuenta
      </Typography>
      <TextField
        label="Correo actual"
        variant="outlined"
        fullWidth
        disabled
        value={auth.currentUser?.email}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#223C43",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#223C43",
          },
          mb: 2,
          mt: 2,
        }}
      />
      <TextField
        label="Nuevo Correo"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmail fontSize="medium" />
            </InputAdornment>
          ),
        }}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        error={!!msg && !open}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#223C43",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#223C43",
          },
          mb: 2,
        }}
      />
      <TextField
        label="Contraseña Actual"
        type="password"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key fontSize="medium" />
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#223C43",
            },
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#223C43",
          },
          mb: 2,
        }}
      />
      <Collapse in={open}>
        <Alert
          severity={
            msg === "Correo actualizado correctamente." ? "success" : "error"
          }
          action={
            <IconButton
              aria-label="close"
              color="red"
              size="small"
              onClick={() => setOpen(false)}
            >
              <Close />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateEmail}
        disabled={!newEmail}
        style={{
          borderRadius: 20,
          textTransform: "none",
          backgroundColor: "#223C43",
          mb: 2,
        }}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "#5d6a6e",
            color: "#c0c0c0",
          },
        }}
        fullWidth
      >
        Actualizar Correo
      </Button>
    </Box>
  );
}
