import { useState } from "react";
import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { getAuth, updateEmail } from "firebase/auth";

export default function UpdateEmail() {
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleUpdateEmail = () => {
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        setMsg("Correo actualizado correctamente.");
        setOpen(true);
      })
      .catch((error) => {
        setMsg(`Ha ocurrido un error: ${error.message}`);
        setOpen(true);
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "regular" }}>
        Cambiar correo asociado a la cuenta
      </Typography>
      <Typography variant="p" sx={{ mb: 2, fontWeight: "lighter" }}>
        Tu correo actual: {auth.currentUser?.email}
      </Typography>
      <TextField
        label="Nuevo Correo"
        variant="outlined"
        fullWidth
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateEmail}
        // disabled={!auth.currentUser.emailVerified} //permito cambiar correo sin haber verificado antes.
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
      <Collapse in={open}>
        <Alert
          severity="info"
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
          sx={{ mt: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
    </Box>
  );
}
