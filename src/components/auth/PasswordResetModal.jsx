/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

function PasswordResetModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleReset = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSnackbarMessage("Correo de restablecimiento enviado");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        onClose();
      })
      .catch((error) => {
        setSnackbarMessage(`Error al enviar el correo: ${error.message}`);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
      >
        <DialogTitle sx={{ bgcolor: "#f5f5f5", color: "#333" }}>
          Restablecer contraseña
        </DialogTitle>
        <DialogContent sx={{ p: 3, pb: 0 }}>
          <Typography fontSize="smaller" sx={{ my: 2 }}>
            Si has olvidado tu contraseña, introduce aquí tu email. <br /> Si
            existe una cuenta asociada, recibirás un enlace de recuperación.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            InputProps={{
              style: { borderRadius: 4 },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: "#red" }}>
          <Button onClick={onClose} variant="contained" color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleReset}
            variant="contained"
            sx={{
              backgroundColor: "#223C43",
              "&:hover": { backgroundColor: "#3a6b78" },
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PasswordResetModal;
