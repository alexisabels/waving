import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  deleteUser as firebaseDeleteUser,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import { AUTH } from "../../lib/routes";
import { Close, Key } from "@mui/icons-material";

export default function DeleteAccount() {
  const auth = getAuth();
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!confirmed) {
      setMsg(
        "Por favor, confirma que quieres eliminar tu cuenta marcando la casilla."
      );
      setOpen(true);
      return;
    }

    if (!auth.currentUser) {
      setMsg("No hay usuario autenticado actualmente.");
      setOpen(true);
      return;
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    const reauthAndDelete = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await deleteDoc(userRef);
        await firebaseDeleteUser(auth.currentUser);
        await auth.signOut();
        setMsg("Cuenta eliminada con éxito y sesión cerrada.");
        setDialogOpen(false);
        navigate(AUTH);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        setMsg(`Error al eliminar la cuenta: ${error.message}`);
        setOpen(true);
      }
    };

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(reauthAndDelete)
      .catch(() => {
        setMsg("Error: La contraseña no es correcta");
        setOpen(true);
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Eliminar cuenta de usuario
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={() => setDialogOpen(true)}
        fullWidth
        sx={{ mt: 2, borderRadius: 2, textTransform: "none", py: 1 }}
      >
        Quiero borrar mi cuenta
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "25px" } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
          Eliminar mi cuenta
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
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
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 3,
                userSelect: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none",
                MozUserSelect: "none",
              }}
            >
              ⚠️
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Eliminar mi cuenta
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
              ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se
              puede deshacer. <strong>Tus posts no se borrarán.</strong>
            </Typography>
            <TextField
              label="Contraseña Actual"
              type="password"
              variant="outlined"
              autoComplete="new-password"
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  sx={{ color: "#f23535", fill: "#f23535" }}
                  style={{
                    color: "#f23535",
                  }}
                />
              }
              label="Confirmo que quiero eliminar mi cuenta permanentemente."
            />
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setOpen(false)}
                  >
                    <Close />
                  </IconButton>
                }
                sx={{ borderRadius: 5, mt: 2 }}
              >
                {msg}
              </Alert>
            </Collapse>
            <Button
              onClick={() => setDialogOpen(false)}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 20,
                py: 1,
                bgcolor: "green",
                "&:hover": {
                  bgcolor: "#45a045",
                },
              }}
            >
              Mantener mi cuenta
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 20,
                py: 1,
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "#f23535",
                },
              }}
            >
              Eliminar mi cuenta
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
