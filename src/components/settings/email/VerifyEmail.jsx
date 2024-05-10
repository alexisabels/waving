import { useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import {
  Alert,
  Button,
  Collapse,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function VerifyEmail() {
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSendVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setMsg(
          "Se ha enviado un correo de verificación. Después de la verificación, recarga esta página para actualizar el estado."
        );
        setOpen(true);
      })
      .catch((error) => {
        setMsg(`Error al enviar el correo de verificación: ${error.message}`);
        setOpen(true);
      });
  };

  return (
    <>
      {!auth.currentUser.emailVerified && (
        <Box
          sx={{
            maxWidth: 400,
            backgroundColor: "rgba(255, 99, 71, 0.17)",
            p: 2,
            borderRadius: 5,
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "regular" }}>
            Verifica tu correo electrónico
          </Typography>
          {!auth.currentUser.emailVerified && (
            <>
              <Alert severity="warning" sx={{ mb: 2, borderRadius: 5 }}>
                Tu correo actual aún no está verificado.
              </Alert>
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
                  sx={{ mb: 2, borderRadius: 5 }}
                >
                  {msg}
                </Alert>
              </Collapse>
              <Button
                variant="contained"
                type="submit"
                style={{
                  borderRadius: 20,
                  textTransform: "none",
                  backgroundColor: "#223C43",
                }}
                onClick={handleSendVerification}
                fullWidth
              >
                Enviar Correo de Verificación
              </Button>
            </>
          )}
        </Box>
      )}
    </>
  );
}
