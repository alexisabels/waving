import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import { deleteUser as firebaseDeleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import { AUTH } from "../../lib/routes";

export default function DeleteAccount() {
  const auth = getAuth();
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!confirmed) {
      setMsg(
        "Por favor, confirma que quieres eliminar la cuenta marcando la casilla."
      );
      setOpen(true);
      return;
    }
    if (!auth.currentUser) {
      setMsg("No hay usuario autenticado actualmente.");
      setOpen(true);
      return;
    }
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await deleteDoc(userRef);
      await firebaseDeleteUser(auth.currentUser);
      await auth.signOut();
      setMsg("Cuenta eliminada con éxito y sesión cerrada.");
      setModalOpen(false);
      navigate(AUTH);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      setMsg(`Error al eliminar la cuenta: ${error.message}`);
      setOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Eliminar cuenta de usuario
      </Typography>
      {open && (
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      )}
      <Button
        variant="contained"
        color="error"
        onClick={() => setModalOpen(true)}
        fullWidth
        sx={{ mt: 2, borderRadius: 2, textTransform: "none", py: 1 }}
      >
        Quiero borrar mi cuenta
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: 300,
            textAlign: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h1"
            component="h1"
            sx={{ mb: 3 }}
          >
            ⚠️
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmar Eliminación de la Cuenta
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se
            puede deshacer. Tus posts no se borrarán.
          </Typography>
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
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              py: 1,
              bgcolor: "red",
              "&:hover": {
                bgcolor: "#f23535",
              },
            }}
          >
            Confirmar y Eliminar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
