import { useState } from "react";
import PasswordResetModal from "../auth/PasswordResetModal";
import { Box, Button, Typography } from "@mui/material";
import EmailSettings from "./email/EmailSettings";
import DeleteAccount from "./DeleteAccount";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => setModalOpen(false);
  const handleOpenModal = () => setModalOpen(true);

  return (
    <Box sx={{ mb: 9 }}>
      <h1>Ajustes</h1>

      <Box sx={{ maxWidth: 400 }}>
        <h2>Contraseña</h2>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "regular" }}>
          ¿Has olvidado tu contraseña?
        </Typography>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          style={{
            borderRadius: 20,
            textTransform: "none",
            backgroundColor: "#223C43",
          }}
          onClick={handleOpenModal}
        >
          Haz click aquí para cambiarla
        </Button>
      </Box>
      <PasswordResetModal open={modalOpen} onClose={handleCloseModal} />
      <h2>Correo electrónico</h2>
      <EmailSettings />
      <h2>Mi cuenta</h2>
      <DeleteAccount />
      <h2>Términos y condiciones y política de privacidad</h2>
      <Link
        to="/terminosycondiciones"
        style={{ textDecoration: "underline", color: "#223C43" }}
      >
        Haz click aquí para revisar los términos y condiciones y la política de
        privacidad
      </Link>
    </Box>
  );
}
